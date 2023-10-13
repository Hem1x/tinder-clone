import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Foundation, Ionicons } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/native';

const Header = ({ title, callEnabled }) => {
  const navigataion = useNavigation();

  return (
    <View className="p-2 mt-5 flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        <TouchableOpacity
          className="p-2"
          onPress={() => navigataion.dispatch(CommonActions.goBack())}>
          <Ionicons
            name="chevron-back-outline"
            size={34}
            color="#FF5864"
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold pl-2">{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity className="rounded-full mr-4 p-3 px-4 bg-red-200">
          <Foundation name="telephone" size={20} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
