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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebaseConfig';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
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
        } else if (errorCode === 'email-already-in-use') {
          Alert.alert('Предупреждение', 'Эта почта уже используется');
        } else if (errorCode === 'missing-password') {
          Alert.alert('Предупреждение', 'Требуется пароль');
        } else if (errorCode === 'weak-password') {
          Alert.alert('Предупреждение', 'Слабый пароль');
        } else {
          Alert.alert('Предупреждение', `Ошибка:${errorCode}`);
        }
      } else {
        Alert.alert(
          'Предупреждение',
          `Произошла неизвестная ошибка:${error}`,
        );
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
      <Text className="text-center text-3xl font-black">
        Tinder registration
      </Text>
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
          onPress={signUp}>
          <Text className="text-white text-center">Sign up</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text className="text-right opacity-30">Enter the Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
