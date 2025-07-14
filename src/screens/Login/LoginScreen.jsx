import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function LoginScreen({ navigation }) {
  const [showYellowSplash, setShowYellowSplash] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const bitcoinIcon = require('../../assets/bitcoin.png');
  const rippleIcon = require('../../assets/ripple.png');
  const litecoinIcon = require('../../assets/litecoin.png');
  const ethereumIcon = require('../../assets/etherum.png');
  const googleIcon = require('../../assets/google.png');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '451026173269-pq819q8qveseu95s9ml03fdarhejirmq.apps.googleusercontent.com', // Your web client ID
      offlineAccess: true,
    });

    const timer = setTimeout(() => {
      setShowYellowSplash(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      navigation.replace('HomeScreen');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Alert.alert("Login Failed", "Unable to sign in with Google. Please try again.");
    }
  };

  // New function to navigate to the Register screen
  const navigateToRegister = () => {
    navigation.navigate('RegisterScreen'); // 'RegisterScreen' will be created next
  };

  if (showYellowSplash) {
    return (
      <View style={styles.yellowSplashContainer}>
        {/* Added text for the splash screen as per previous suggestion */}
        <Text style={styles.yellowSplashText}>CryptoApp</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.mainContainer, { opacity: fadeAnim }]}>

      <View style={styles.cryptoIconsContainer}>
        <Image source={bitcoinIcon} style={styles.bitcoinIcon} resizeMode="contain" />
        <Image source={rippleIcon} style={styles.rippleIcon} resizeMode="contain" />
        <Image source={litecoinIcon} style={styles.litecoinIcon} resizeMode="contain" />
        <Image source={ethereumIcon} style={styles.ethereumIcon} resizeMode="contain" />
      </View>

      <View style={styles.welcomeTextSection}>
        <Text style={styles.helloText}>HELLO!</Text>
        <Text style={styles.welcomeMessage}>
          Welcome to your crypto trading journey! {'\n'}
          Explore, learn, and compete while mastering {'\n'}
          the market without any risk.
        </Text>
      </View>

      {/* Google Sign-In Button */}
      <TouchableOpacity style={styles.googleButton} onPress={signIn}>
        <Image source={googleIcon} style={styles.googleIcon} resizeMode="contain" />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      {/* NEW: Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={navigateToRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>


      <View style={styles.bottomNavBarPlaceholder} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  yellowSplashContainer: {
    flex: 1,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowSplashText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
  },
  cryptoIconsContainer: {
    width: '100%',
    height: '40%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bitcoinIcon: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: '10%',
    left: '20%',
    zIndex: 4,
  },
  rippleIcon: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: '10%',
    right: '15%',
    zIndex: 3,
  },
  litecoinIcon: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: '35%',
    right: '5%',
    zIndex: 2,
  },
  ethereumIcon: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: '45%',
    left: '35%',
    zIndex: 1,
  },
  welcomeTextSection: {
    alignItems: 'center',
    marginHorizontal: 30,
    marginBottom: 40,
  },
  helloText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  welcomeMessage: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 15, // Reduced margin to make space for the new button
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  // NEW: Register Button Styles
  registerButton: {
    backgroundColor: '#FFC107', // Yellow background for Register button
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 80, // Space from bottom nav bar
    width: '70%', // Make it a bit wider or match Google button width
    alignItems: 'center', // Center text
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A', // Dark text color for contrast
  },
  bottomNavBarPlaceholder: {
    width: '100%',
    height: 50,
    backgroundColor: '#1A1A1A',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
});
