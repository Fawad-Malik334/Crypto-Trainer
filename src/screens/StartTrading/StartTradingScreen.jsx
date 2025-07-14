import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function StartTradingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to the Trading Screen!</Text>
        <Text style={styles.subText}>You landed here by clicking "Start Trading".</Text>
        <Text style={styles.message}>This is where you'll be able to buy and sell crypto.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A', // Dark background
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    color: '#66BB6A', // Green accent
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
