import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';

const Layout = ({ children }) => {
  return <SafeAreaView className={`flex-1 mt-5`}>{children}</SafeAreaView>;
};

export default Layout;
