import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import { useRoute } from '@react-navigation/native';
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/ReceiverMessage';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Feather } from '@expo/vector-icons';

const MessagesScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const { matchDetails } = params;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      name: user.email,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    });

    setInput('');
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'matches', matchDetails.id, 'messages'),
        orderBy('timestamp', 'desc'),
      ),
      (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        ),
    );

    return unsubscribe;
  }, [matchDetails, db]);

  return (
    <Layout>
      <Header
        title={getMatchedUserInfo(matchDetails?.users, user.uid).name}
        callEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className={'flex-1'}
        keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={messages}
            inverted={true}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
            className={'px-4'}
          />
        </TouchableWithoutFeedback>

        <View className="flex-row bg-white justify-between items-center border-t border-gray-200 mt-10">
          <TextInput
            className="h-10 text-lg px-5"
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <TouchableOpacity title="Send" onPress={sendMessage}>
            <Feather
              name="send"
              size={24}
              color="white"
              style={{
                backgroundColor: '#FF5864',
                padding: 15,
              }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default MessagesScreen;
