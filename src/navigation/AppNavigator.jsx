import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Example screens
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen'; 
import LoginEmailPasswordScreen from '../screens/RegisterScreen/LoginEmailPasswordScreen'; 
import LearnScreen from '../screens/HomeScreen/LearnScreen';
import CompeteScreen from '../screens/HomeScreen/CompeteScreen';
import ProfileScreen from '../screens/HomeScreen/ProfileScreen';
import StartTradingScreen from '../screens/StartTrading/StartTradingScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
     
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginEmailPasswordScreen" component={LoginEmailPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LearnScreen" component={LearnScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CompeteScreen" component={CompeteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StartTradingScreen" component={StartTradingScreen} options={{ headerShown: false }} />
        {/* Add more screens as needed */}

        
    
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
