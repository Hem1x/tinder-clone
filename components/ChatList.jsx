import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import useAuth from '../hooks/useAuth';
import ChatRow from './ChatRow';

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'matches'),
        where('usersMatched', 'array-contains', user.uid),
      ),
      (snapshot) =>
        setMatches(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        ),
    );
  }, [user]);

  console.log(matches);

  return (
    <>
      {matches.length > 0 ? (
        <FlatList
          data={matches}
          className="p-2 h-full"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatRow matchDetails={item} />}
        />
      ) : (
        <View>
          <Text>No matches at the moment</Text>
        </View>
      )}
    </>
  );
};

export default ChatList;
