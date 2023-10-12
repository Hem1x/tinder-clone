import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { CommonActions, useRoute } from '@react-navigation/native';

const MatchedScreen = ({ navigation }) => {
  const { params } = useRoute();
  const { loggedInProfile, userSwiped } = params;

  return (
    <View className="h-full bg-red-500 pt-20" style={{ opacity: 0.89 }}>
      <View className="justify-center px-10 pt-20 items-center">
        <Image
          source={require('../assets/match.png')}
          style={{ width: 200, height: 100 }}
          resizeMode="contain"
        />
      </View>

      <Text className="text-white text-center mt-5">
        You and {userSwiped.name} have liked each other
      </Text>

      <View className="flex-row justify-evenly mt-5">
        <Image
          className="w-32 h-32 rounded-full"
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image
          className="w-32 h-32 rounded-full"
          source={{ uri: userSwiped.photoURL }}
        />
      </View>

      <TouchableOpacity
        className="bg-white m-5 px-10 py-8 rounded-full mt-20"
        onPress={() => {
          navigation.dispatch(CommonActions.goBack());
          navigation.navigate('Chat');
        }}>
        <Text className="text-center">Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;
