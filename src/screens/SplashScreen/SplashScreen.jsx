import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, PanResponder, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const slideX = useRef(new Animated.Value(0)).current; 
  const [isSwipingComplete, setIsSwipingComplete] = useState(false); 


  const yellowCoinImage = require('../../assets/yellowcoin.png');
  const orangeCoinImage = require('../../assets/orange.png');
  const outlinedCoinImage = require('../../assets/silver.png');
  const flameCharacterImage = require('../../assets/character.png');
  // --- Slider Configuration ---
  const sliderContainerWidth = width * 0.8;
  const sliderThumbWidth = 50;
  const maxSlideDistance = sliderContainerWidth - sliderThumbWidth; // Max distance thumb can move
  const visualTransitionThreshold = maxSlideDistance * 0.5; // Halfway point for visual change

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
    onPanResponderMove: Animated.event(
      [null, { dx: slideX }],
      {
        useNativeDriver: false,
       
      }
    ),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx >= maxSlideDistance * 0.95) { // Allow a small tolerance for "complete" swipe
        setIsSwipingComplete(true); // Mark swipe as completed
        Animated.timing(slideX, {
          toValue: maxSlideDistance,
          duration: 100, // Quick snap to end
          useNativeDriver: false,
        }).start(() => {
          navigation.replace('Login'); // Navigate to Login screen
        });
      } else {
        // If not fully swiped, spring back to the start
        Animated.spring(slideX, { toValue: 0, useNativeDriver: false }).start();
      }
    },
  });

  // --- ANIMATED STYLES ---

  // 1. Background Color Interpolation
  const backgroundColorAnim = slideX.interpolate({
    inputRange: [0, visualTransitionThreshold, maxSlideDistance],
    outputRange: ['#61D25A', '#000000', '#000000'], // Green -> Black -> Black
    extrapolate: 'clamp',
  });

  // 2. Opacity for Green Screen Content (Fades Out)
  const greenContentOpacity = slideX.interpolate({
    inputRange: [0, visualTransitionThreshold * 0.8, visualTransitionThreshold], // Start fading before halfway
    outputRange: [1, 0, 0], // Fully visible -> Faded out -> Faded out
    extrapolate: 'clamp',
  });

  // 3. Opacity for Black Screen Content (Fades In)
  const blackContentOpacity = slideX.interpolate({
    inputRange: [0, visualTransitionThreshold * 0.8, visualTransitionThreshold], // Starts fading in before halfway
    outputRange: [0, 1, 1], // Hidden -> Visible -> Visible
    extrapolate: 'clamp',
  });

  // 4. Clamped TranslateX for Slider Thumb (visual movement)
  const clampedTranslateX = slideX.interpolate({
    inputRange: [0, maxSlideDistance],
    outputRange: [0, maxSlideDistance],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: backgroundColorAnim }]}>
      {/* --- Content for the Green Screen Phase (Fades Out) --- */}
      <Animated.View style={[styles.greenContentOverlay, { opacity: greenContentOpacity }]}>
        <Text style={styles.title}>Welcome to Crypto Trainer</Text>

        <View style={styles.cardsContainer}>
          <View style={[styles.card, { backgroundColor: '#FFBE3B', transform: [{ rotate: '-15deg' }] }]}>
            <Text style={styles.cardTitle}>BTC/USDT</Text>
            <Text>$2,498.03</Text>
          </View>
          <View style={[styles.card, { backgroundColor: '#9CD8FF', transform: [{ rotate: '5deg' }] }]}>
            <Text style={styles.cardTitle}>BTC/USDT</Text>
            <Text>$2,498.03</Text>
          </View>
          <View style={[styles.card, { backgroundColor: '#1A1A1A', transform: [{ rotate: '20deg' }] }]}>
            <Text style={[styles.cardTitle, { color: '#fff' }]}>BTC/USDT</Text>
            <Text style={{ color: '#fff' }}>$2,498.03</Text>
          </View>
        </View>

        <View style={styles.trustedContainer}>
          <Text style={styles.trustedText}># Trusted by 45,000 people</Text>
        </View>

        <Text style={styles.tagline}>Trade with Zero <Text style={{ fontSize: 18 }}>🚀💰🪙</Text>{'\n'}Risk, Learn Like a Pro!</Text>
      </Animated.View>

      {/* --- Content for the Black Screen Phase (Fades In) --- */}
      <Animated.View style={[styles.blackContentOverlay, { opacity: blackContentOpacity }]}>
       
        <Text style={styles.onboardingWelcomeText}>Welcome to CryptoTrainer</Text>

        {/* Crypto Illustrations (from OnboardingScreen) */}
        <View style={styles.illustrationsContainer}>
          <Image source={outlinedCoinImage} style={styles.outlinedCoin} resizeMode="contain" />
          <Image source={yellowCoinImage} style={styles.yellowCoin} resizeMode="contain" />
          <Image source={orangeCoinImage} style={styles.orangeCoin} resizeMode="contain" />
          <Image source={flameCharacterImage} style={styles.flameCharacter} resizeMode="contain" />
        </View>

        {/* Main Tagline (from OnboardingScreen) */}
        <Text style={styles.onboardingTagline}>
          Trade smarter, track gains, {'\n'}
          and build your portfolio!
        </Text>

        {/* Pagination Dots (from OnboardingScreen) */}
        <View style={styles.paginationContainer}>
          <View style={styles.paginationDotInactive} />
          <View style={styles.paginationDotInactive} />
          <View style={styles.paginationDotActive} />
        </View>
      </Animated.View>

      {/* --- Slider Container (remains visible and active, positioned absolutely at bottom) --- */}
      <View style={styles.sliderContainerAbsolute}> {/* Changed style name */}
        <View style={styles.sliderTrack}>
          <Animated.View
            style={[
              styles.sliderThumb,
              { transform: [{ translateX: clampedTranslateX }] },
            ]}
            {...panResponder.panHandlers}
          >
            <Icon name="chevron-double-right" size={24} color="#000" />
          </Animated.View>
          <Text style={styles.sliderText}>Swipe to Continue</Text>
        </View>
      </View>

      
      <View style={styles.bottomNavBarPlaceholder} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },


  greenContentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Ensure it covers the whole screen
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 15,
    marginBottom: 60,

    fontWeight: 'bold',
    color: '#000',
  },
  cardsContainer: {
    flexDirection: 'row',
    marginBottom: 30,

    marginTop: 50,
  },
  card: {
    width: 180,
    height: 210,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    color: '#000',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  trustedContainer: {
    backgroundColor: '#49494a',
    paddingHorizontal: 40,
    marginRight: 110,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
  trustedText: {
    color: '#fff',
    fontSize: 12,
  },
  tagline: {
    marginRight: 80,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },

  // --- Black Screen Content Styles (from OnboardingScreen) ---
  blackContentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Ensure it covers the whole screen
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20, 
    zIndex: 0,
  },
  statusBarPlaceholder: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  statusBarText: {
    color: '#fff',
    fontSize: 12,
  },
  onboardingWelcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  illustrationsContainer: {
    width: '100%',
    height: height * 0.4,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  yellowCoin: {
    width: width * 0.5,
    height: width * 0.5,
    position: 'absolute',
    top: '10%',
    left: '35%',
    zIndex: 3,
  },
  orangeCoin: {
    width: width * 0.4,
    height: width * 0.4,
    position: 'absolute',
    top: '40%',
    left: '10%',
    zIndex: 2,
  },
  outlinedCoin: {
    width: width * 0.3,
    height: width * 0.3,
    position: 'absolute',
    top: '20%',
    left: '0%',
    zIndex: 1,
  },
  flameCharacter: {
    width: width * 0.35,
    height: width * 0.35,
    position: 'absolute',
    top: '30%',
    right: '5%',
    zIndex: 4,
  },
  onboardingTagline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    width: '80%',
    marginBottom: 30,
    lineHeight: 35,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  paginationDotInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    width: 25,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7BE495',
    marginHorizontal: 5,
  },

  sliderContainerAbsolute: { 
    width: '80%',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 70,
    left: '10%', 
    right: '10%',
    zIndex: 10, 
  },
  sliderTrack: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
  },
  sliderThumb: {
    width: 50,
    height: 50,
    backgroundColor: '#7BE495',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    zIndex: 2,
  },
  sliderText: {
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    fontSize: 16,
  },
  bottomNavBarPlaceholder: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
});
