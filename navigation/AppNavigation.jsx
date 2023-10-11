import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '../screens/LoginScreen';
import useAuth, { AuthProvider } from '../hooks/useAuth';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;
