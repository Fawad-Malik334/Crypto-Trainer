import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function LearnScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Guidance Screen!</Text>
      <Text style={styles.subText}>Here you'll find resources to help you learn about crypto trading. And some other things </Text>
      <Image source={{ uri: 'https://placehold.co/200x200/4CAF50/FFFFFF?text=Learn' }} style={styles.image} />
      {/* You can add more content here later, like a list of articles or tutorials */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Allows the container to take up available space
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1A1A1A', // Match overall app background
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
