import { createStaticNavigation, DarkTheme, DefaultTheme, NavigationIndependentTree, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import { useColorScheme } from 'react-native';
import Onboarding from './(onboarding)/onboarding';
import OnboardingResults from './(onboarding)/onboardingResults';
import Hub from './(hub)/hub';
import DomainDetail from './(hub)/domainDetail';
import TutorialStep from './(hub)/tutorialStep';
import { ProgressProvider } from '@/context/ProgressContext';

const AppStack = createNativeStackNavigator(
  {
    screens: {
      onboarding: {
        screen: Onboarding,
        options: { headerShown: false },
      },
      onboardingResults: {
        screen: OnboardingResults,
        options: { headerShown: false },
      },
      hub: {
        screen: Hub,
        options: { headerShown: false },
      },
      domainDetail: {
        screen: DomainDetail,
        options: { headerShown: false },
      },
      tutorialStep: {
        screen: TutorialStep,
        options: { headerShown: false },
      },
    },
  }
);

const Navigation = createStaticNavigation(AppStack);

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ProgressProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <NavigationIndependentTree>
          <Navigation />
        </NavigationIndependentTree>
      </ThemeProvider>
    </ProgressProvider>
  );
}
