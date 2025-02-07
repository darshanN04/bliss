import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import { ToastProvider } from 'react-native-toast-notifications';
import AuthProvider from '@/providers/auth-provider';


// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  

    return (
      <ToastProvider>
        <AuthProvider>
          <Stack screenOptions={{headerShown: false}}/>
        </AuthProvider>
    </ToastProvider>
  );
}
