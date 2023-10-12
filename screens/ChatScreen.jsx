import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Layout from '../components/Layout';

const ChatScreen = () => {
  const navigation = useNavigation();

  return (
    <Layout>
      <Text>Chat</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </Layout>
  );
};

export default ChatScreen;
