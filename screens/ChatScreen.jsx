import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Layout from '../components/Layout';
import Header from '../components/Header';
import ChatList from '../components/ChatList';

const ChatScreen = () => {
  const navigation = useNavigation();

  return (
    <Layout>
      <Header title="Chat" />
      <ChatList />
    </Layout>
  );
};

export default ChatScreen;
