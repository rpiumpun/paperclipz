import "./global.css";
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CurrencyScreen from './screens/CurrencyScreen';

// Define the navigation types
type RootStackParamList = {
  Home: undefined;
  Currency: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Currency" component={CurrencyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
