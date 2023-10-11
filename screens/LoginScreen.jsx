import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code.startsWith('auth/')
      ) {
        const errorCode = error.code.replace('auth/', '');
        if (errorCode === 'invalid-email') {
          Alert.alert('Предупреждение', 'Неверный формат почты');
        } else if (errorCode === 'invalid-login-credentials') {
          Alert.alert('Ошибка', 'Неверный логин или пароль');
        } else {
          Alert.alert('Ошибка', `${errorCode}`);
        }
      } else {
        Alert.alert('Ошибка', `Произошла неизвестная ошибка:${error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-10 gap-5">
      <Image
        source={require('../assets/logo.png')}
        resizeMode="contain"
        style={{ width: 100, height: 100, alignSelf: 'center' }}
      />
      <Text className="text-center text-3xl font-black">Tinder login</Text>

      <TextInput
        className="border border-[#ccc] p-2 px-5 rounded-xl"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry
        className="border border-[#ccc] p-2 px-5 rounded-xl"
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity
          className="p-3 px-5 bg-[#FE4F67] rounded-xl"
          onPress={signIn}>
          <Text className="text-white text-center">Sign in</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text className="text-right opacity-30">Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
