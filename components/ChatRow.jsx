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

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

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
      <Text>{matchedUserInfo?.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    elevation: 2,
  },
});

export default ChatRow;
