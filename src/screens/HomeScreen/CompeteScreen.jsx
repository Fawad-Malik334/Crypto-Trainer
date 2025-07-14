import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function CompeteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compete with others!</Text>
      <Text style={styles.subText}>Join exciting competitions and test your trading skills.</Text>
      <Image source={{ uri: 'https://placehold.co/200x200/FFC107/000000?text=Compete' }} style={styles.image} />
      {/* Add competition listings, leaderboards, etc., here later */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1A1A1A',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#555',
    marginBottom: 20,
  },
});
