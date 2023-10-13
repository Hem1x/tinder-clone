import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  const [lastMessage, setLastMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'matches', matchDetails.id, 'messages'),
        orderBy('timestamp', 'desc'),
      ),
      (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message),
    );

    return unsubscribe;
  }, [matchDetails, db]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Messages', {
          matchDetails,
        })
      }
      className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
      style={styles.cardShadow}>
      <Image
        source={{ uri: matchedUserInfo?.photoURL }}
        className="rounded-full h-16 w-16 mr-4"
      />
      <View>
        <Text className={'text-lg font-semibold'}>
          {matchedUserInfo?.name}
        </Text>
        <Text>{lastMessage || 'Say Hi'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    elevation: 2,
  },
});

export default ChatRow;
