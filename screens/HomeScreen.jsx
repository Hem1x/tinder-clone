import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import useAuth from '../hooks/useAuth';
import { auth, db } from '../firebaseConfig';
import Layout from '../components/Layout';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import generateId from '../lib/generateId';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swiperRef = useRef(null);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, 'user', user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate('Modal');
        }
      }),
    [],
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, 'user', user.uid, 'passes'),
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, 'user', user.uid, 'swipes'),
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ['test'];
      const swipedUserIds = swipes.length > 0 ? swipes : ['test'];

      unsub = onSnapshot(
        query(
          collection(db, 'user'),
          where('id', 'not-in', [...passedUserIds, ...swipedUserIds]),
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })),
          );
        },
      );
    };

    fetchCards();
    return unsub;
  }, [db]);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    setDoc(doc(db, 'user', user.uid, 'passes', userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (
      await getDoc(doc(db, 'user', user.uid))
    ).data();

    getDoc(doc(db, 'user', userSwiped.id, 'swipes', user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          console.log('You matched with' + userSwiped.name);
          setDoc(
            doc(db, 'user', user.uid, 'swipes', userSwiped.id),
            userSwiped,
          );

          // Create a MATCH
          setDoc(doc(db, 'matches', generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          // Navigate to MATCH
          navigation.navigate('Match', {
            loggedInProfile,
            userSwiped,
          });
        } else {
          setDoc(
            doc(db, 'user', user.uid, 'swipes', userSwiped.id),
            userSwiped,
          );
        }
      },
    );

    setDoc(doc(db, 'user', user.uid, 'swipes', userSwiped.id), userSwiped);
  };

  return (
    <Layout>
      {/* Header */}
      <View className="flex-row justify-between p-5">
        <TouchableOpacity onPress={() => auth.signOut()}>
          <View className="w-10 h-10 rounded-full bg-[#FE4F67] justify-center items-center">
            <Text className="text-xl text-white">
              {user.email.slice(0, 2).toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Image
            source={require('../assets/logo.png')}
            resizeMode="contain"
            style={{
              width: 50,
              height: 50,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>

      {/* Card */}
      <View className="flex-1 -mt-6" style={{ position: 'relative' }}>
        <Swiper
          cards={profiles}
          ref={swiperRef}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
          onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
          animateCardOpacity
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  color: 'red',
                },
              },
            },
            right: {
              title: 'MATCH',
              style: {
                label: {
                  textAlign: 'left',
                  color: 'lightgreen',
                },
              },
            },
          }}
          containerStyle={{
            backgroundColor: 'transparent',
          }}
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                style={styles.cardShadow}
                className=" bg-red-500 h-3/4 rounded-xl">
                {console.log(card)}
                <Image
                  source={{ uri: card.photoURL }}
                  className="abosolute top-0 w-full h-full rounded-xl"
                />
                <View className="absolute bottom-0 left-0 w-full bg-white px-7 py-5 flex-row justify-between items-center rounded-b-xl">
                  <View>
                    <Text className="text-2xl font-bold">{card.name}</Text>
                    <Text className="text-base">{card.job}</Text>
                  </View>
                  <View>
                    <Text className="font-bold text-xl">{card.age}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View
                className="relative bg-white h-3/4 rounded-xl justify-center items-center"
                style={{ elevation: 5 }}>
                <Text className="font-bold pb-5">No more profiles</Text>

                <Image
                  className="h-20 w-full"
                  height={100}
                  width={100}
                  resizeMode="contain"
                  source={{
                    uri: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037',
                  }}
                />
              </View>
            )
          }
        />
      </View>

      <View className="flex flex-row justify-evenly mb-10">
        <TouchableOpacity
          onPress={() => swiperRef.current.swipeLeft()}
          className="items-center justify-center rounded-full w-16 h-16 bg-red-200">
          <Entypo name="cross" size={24} color={'red'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swiperRef.current.swipeRight()}
          className="items-center justify-center rounded-full w-16 h-16 bg-green-200">
          <AntDesign name="heart" size={24} color={'green'} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    elevation: 5,
  },
});

export default HomeScreen;
