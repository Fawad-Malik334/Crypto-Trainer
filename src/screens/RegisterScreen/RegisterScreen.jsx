import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Basic validation
    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      // Check if user already exists
      const existingUser = await AsyncStorage.getItem(email.toLowerCase());
      if (existingUser) {
        Alert.alert('Registration Failed', 'This email is already registered. Please try logging in or use a different email.');
        return;
      }

      // If all checks pass, save user data to AsyncStorage
      const userData = {
        name: name,
        email: email.toLowerCase(), // Store email in lowercase for consistency
        phoneNumber: phoneNumber,
        password: password, // WARNING: Storing plain password in AsyncStorage is NOT secure for production apps.
      };

      await AsyncStorage.setItem(email.toLowerCase(), JSON.stringify(userData));
      console.log('User registered:', userData);

      // Show success alert and navigate to the new Login screen
      Alert.alert(
        'Registration Successful!',
        'You have been registered. Please log in now.',
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('LoginEmailPasswordScreen'), // Navigate to the new login screen
          },
        ]
      );

    } catch (error) {
      console.error('AsyncStorage Error:', error);
      Alert.alert('Registration Failed', 'An error occurred during registration. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
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
        placeholder="Phone Number"
        placeholderTextColor="#888"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginLinkText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginEmailPasswordScreen')}>
          <Text style={styles.loginLink}>Login here</Text>
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
  registerButton: {
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
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A', // Dark text
  },
  loginLinkContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#ccc',
    fontSize: 15,
  },
  loginLink: {
    color: '#FFC107', // Yellow link
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
