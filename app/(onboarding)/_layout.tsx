import { createStaticNavigation, DarkTheme, DefaultTheme, NavigationIndependentTree, ThemeProvider } from '@react-navigation/native';
// Import the createNativeStackNavigator function to create a stack navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import { useColorScheme } from 'react-native';
import Onboarding from './onboarding';
import OnboardingResults from './onboardingResults';



const OnboardingStack = createNativeStackNavigator(
  {
    screens: {
      onboarding : {
        screen: Onboarding,
        options: { headerShown: false },
      },
      onboardingResults: {
        screen: OnboardingResults,
        options: { headerShown: false },
      },
    }
  }
);

const Navigation = createStaticNavigation(OnboardingStack);

export default function OnboardingLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavigationIndependentTree>
        <Navigation  />
      </NavigationIndependentTree>
    </ThemeProvider>
      
  );
}