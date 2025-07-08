import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

// Animated Button Component
function AnimatedButton({ title, onPress }: { title: string; onPress: () => void }) {
  const scaleValue = new Animated.Value(1);
  const progressValue = new Animated.Value(0);
  const [isHolding, setIsHolding] = React.useState(false);
  const [holdTimer, setHoldTimer] = React.useState<NodeJS.Timeout | null>(null);

  const HOLD_DURATION = 1000; // 1 second to activate

  const startHold = () => {
    setIsHolding(true);
    
    // Light vibration when starting to hold
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Scale down animation
    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();

    // Progress animation
    Animated.timing(progressValue, {
      toValue: 1,
      duration: HOLD_DURATION,
      useNativeDriver: false,
    }).start();

    // Set timer for activation
    const timer = setTimeout(() => {
      activateButton();
    }, HOLD_DURATION);
    
    setHoldTimer(timer);
  };

  const cancelHold = () => {
    setIsHolding(false);
    
    // Clear timer
    if (holdTimer) {
      clearTimeout(holdTimer);
      setHoldTimer(null);
    }

    // Reset animations
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(progressValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const activateButton = () => {
    // Success vibration
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Celebration animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Reset progress
    progressValue.setValue(0);
    setIsHolding(false);
    
    // Call the actual onPress function
    setTimeout(onPress, 300);
  };

  const progressWidth = progressValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const backgroundColor = progressValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#007AFF', '#FF6B35', '#00C851'],
  });

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        onPressIn={startHold}
        onPressOut={cancelHold}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.animatedButton, { backgroundColor }]}>
          <Text className='text-white text-lg font-bold text-center'>{title}</Text>
          {isHolding && (
            <View style={styles.progressContainer}>
              <Animated.View 
                style={[
                  styles.progressBar,
                  { width: progressWidth }
                ]} 
              />
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
      {isHolding && (
        <Text style={styles.holdText}>Hold to activate...</Text>
      )}
    </Animated.View>
  );
}

// Home Screen Component
export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text className='text-3xl font-bold mb-5'>Welcome to Productive Lock</Text>
      <AnimatedButton
        title="🚀 Go to Currency Page"
        onPress={() => navigation.navigate('Currency')}
      />
      <StatusBar style="auto" />
    </View>
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
  animatedButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'relative',
    overflow: 'hidden',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  holdText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 