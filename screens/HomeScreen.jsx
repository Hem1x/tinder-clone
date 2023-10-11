import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';
import useAuth from '../hooks/useAuth';
import { auth } from '../firebaseConfig';
import { useLayoutEffect } from 'react';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <View>
      <Text>Hello, {user}</Text>
      <Button title="Chat" onPress={() => navigation.navigate('Chat')} />
      <Button title="Sign out" onPress={() => auth.signOut()} />
    </View>
  );
};

export default HomeScreen;
