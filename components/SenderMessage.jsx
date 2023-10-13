import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SenderMessage = ({ message }) => {
  return (
    <View
      style={styles.container}
      className={
        'bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2'
      }>
      <Text className={'text-white'}>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;

const styles = StyleSheet.create({
  container: { alignSelf: 'flex-start', marginLeft: 'auto' },
});
