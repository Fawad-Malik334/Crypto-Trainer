import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function LoginEmailPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const userDataString = await AsyncStorage.getItem(email.toLowerCase());

      if (!userDataString) {
        Alert.alert('Login Failed', 'No account found with this email. Please register.');
        return;
      }

      const userData = JSON.parse(userDataString);

      if (userData.password === password) {
        // Login successful
        Alert.alert('Login Successful', 'Welcome back!', [
          {
            text: 'OK',
            onPress: () => navigation.replace('HomeScreen'), // Navigate to Home Screen on success
          },
        ]);
      } else {
        Alert.alert('Login Failed', 'Incorrect password. Please try again.');
      }

    } catch (error) {
      console.error('AsyncStorage Error:', error);
      Alert.alert('Login Failed', 'An error occurred during login. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login to Your Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerLinkContainer}>
        <Text style={styles.registerLinkText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.registerLink}>Register here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A', // Dark background
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  input: {
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#FFC107', // Yellow button
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A', // Dark text
  },
  registerLinkContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerLinkText: {
    color: '#ccc',
    fontSize: 15,
  },
  registerLink: {
    color: '#FFC107', // Yellow link
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
