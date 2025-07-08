import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Currency Screen Component
export default function CurrencyScreen() {
  const [currency, setCurrency] = React.useState(0);

  const updateCurrency = (increase: boolean, amount: number) => {
    if (increase) {
      setCurrency(currency + amount);
    } else {
      setCurrency(currency - amount);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Page</Text>
      
      <View style={styles.currencyContainer}>
        <Text style={styles.currencyLabel}>Current Currency:</Text>
        <Text style={styles.currencyCount}>{currency}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.currencyButton} 
          onPress={() => updateCurrency(false, 1)}
        >
          <Text style={styles.currencyButtonText}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.currencyButton} 
          onPress={() => updateCurrency(true, 1)}
        >
          <Text style={styles.currencyButtonText}>+</Text>
        </TouchableOpacity>
      </View>
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
  currencyContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  currencyLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  currencyCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 20,
  },
  currencyButton: {
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  currencyButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 