import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import useAuth from '../hooks/useAuth';
import { auth } from '../firebaseConfig';
import Layout from '../components/Layout';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { DUMMY_DATA } from '../mock/data';
import { useRef } from 'react';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const swiperRef = useRef(null);

  return (
    <Layout>
      {/* Header */}
      <View className="flex-row justify-between p-5">
        <TouchableOpacity onPress={() => auth.signOut()}>
          <View className="w-10 h-10 rounded-full bg-[#FE4F67] justify-center items-center">
            <Text className="text-xl text-white">
              {user.slice(0, 2).toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
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
          ref={swiperRef}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          onSwipedLeft={() => console.log('NOPE')}
          onSwipedRight={() => console.log('MATCH')}
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
          cards={DUMMY_DATA}
          renderCard={(card) => (
            <View
              key={card.id}
              style={styles.cardShadow}
              className=" bg-red-500 h-3/4 rounded-xl">
              <Image
                source={{ uri: card.photoURL }}
                className="abosolute top-0 w-full h-full rounded-xl"
              />
              <View className="absolute bottom-0 left-0 w-full bg-white px-7 py-5 flex-row justify-between items-center rounded-b-xl">
                <View>
                  <Text className="text-2xl font-bold">
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text className="text-base">{card.occupation}</Text>
                </View>
                <View>
                  <Text className="font-bold text-xl">{card.age}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      <View className="flex flex-row justify-evenly mb-10">
        <TouchableOpacity className="items-center justify-center rounded-full w-16 h-16 bg-red-200">
          <Entypo name="cross" size={24} color={'red'} />
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center rounded-full w-16 h-16 bg-green-200">
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
