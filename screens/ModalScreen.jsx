import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const [name, setName] = useState(null);

  const incompleteForm = !image || !job || !age || !name;

  const updateUserProfile = () => {
    setDoc(doc(db, 'user', user.uid), {
      id: user.uid,
      photoURL: image,
      name: name,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View className="flex-1 items-center pt-5">
      <Image
        className="h-20 w-full"
        resizeMode="contain"
        source={{
          uri: 'https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo.png',
        }}
      />
      <Text className="text-xl text-gray-500 p-2 font-bold">
        Welcome, {user && user.email.split('@')[0]}!
      </Text>

      <View
        style={{
          gap: 30,
          width: '70%',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <View style={{ width: '100%' }}>
          <Text className="text-center p-4 font-bold text-red-400">
            Step 1: The Profile Pic
          </Text>
          <TextInput
            style={styles.input}
            value={image}
            onChangeText={setImage}
            className="text-center text-base pb-2"
            placeholder="Enter a Profile Pic URL"
          />
        </View>

        <View style={{ width: '100%' }}>
          <Text className="text-center p-4 font-bold text-red-400">
            Step 2: Your Name
          </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            className="text-center text-base pb-2"
            placeholder="Enter a Profile Pic URL"
          />
        </View>

        <View style={{ width: '100%' }}>
          <Text className="text-center p-4 font-bold text-red-400">
            Step 3: The Job
          </Text>
          <TextInput
            style={styles.input}
            value={job}
            onChangeText={setJob}
            className="text-center text-base pb-2"
            placeholder="Enter your occupation"
          />
        </View>

        <View style={{ width: '100%' }}>
          <Text className="text-center p-4 font-bold text-red-400">
            Step 4: The Age
          </Text>
          <TextInput
            style={styles.input}
            value={age}
            maxLength={2}
            keyboardType="numeric"
            onChangeText={setAge}
            className="text-center text-base pb-2 "
            placeholder="Enter your age"
          />
        </View>
      </View>
      <TouchableOpacity
        disabled={incompleteForm}
        onPress={updateUserProfile}
        className={`w-64 p-3 rounded-xl  ${
          incompleteForm ? 'bg-gray-400' : 'bg-red-400'
        }`}>
        <Text className="text-center text-white text-xl">
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
  },
});

export default ModalScreen;
