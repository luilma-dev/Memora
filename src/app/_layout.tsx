import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { DarkTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DesignTokens } from '@/constants/design-tokens';

SplashScreen.preventAutoHideAsync();

const MemoraDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: DesignTokens.colors.accentPrimary,
    background: DesignTokens.colors.bgCanvas,
    card: DesignTokens.colors.bgHeader,
    text: DesignTokens.colors.textPrimary,
    border: DesignTokens.colors.borderSubtle,
    notification: DesignTokens.colors.statusDangerBg,
  },
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={MemoraDarkTheme}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: DesignTokens.colors.bgCanvas },
          }}
        />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
