import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Define the navigation types
type RootStackParamList = {
  Home: undefined;
  Currency: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Animated Button Component
function AnimatedButton({ title, onPress }: { title: string; onPress: () => void }) {
  const scaleValue = new Animated.Value(1);
  const colorValue = new Animated.Value(0);

  const animatePress = () => {
    // Scale animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Color animation
    Animated.sequence([
      Animated.timing(colorValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(colorValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();

    // Call the actual onPress function after a short delay
    setTimeout(onPress, 200);
  };

  const backgroundColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#007AFF', '#FF6B35'],
  });

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity onPress={animatePress}>
        <Animated.View style={[styles.animatedButton, { backgroundColor }]}>
          <Text style={styles.buttonText}>{title}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// Home Screen Component
function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Productive Lock</Text>
      <AnimatedButton
        title="🚀 Go to Currency Page"
        onPress={() => navigation.navigate('Currency')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

// Currency Screen Component
function CurrencyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Page</Text>
      <Text style={styles.subtitle}>This is the currency page with filler text</Text>
    </View>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  animatedButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
