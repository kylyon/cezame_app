# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cezame App is a React Native mobile app (Expo SDK 54, React 19, TypeScript strict) that assesses users' "administrative phobia" through a gamified onboarding questionnaire. Client-side only, no backend.

## Commands

```bash
npm start          # Start Expo dev server
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web version
npm run lint       # ESLint (expo lint)
```

No test framework is configured.

## Architecture

### Navigation

The root layout (`app/_layout.tsx`) uses React Navigation 7's **static API** (`createNativeStackNavigator` + `createStaticNavigation`), not Expo Router's file-based routing. The navigation tree is:

```
OnboardingStack (static stack navigator)
├── onboarding       → app/(onboarding)/onboarding.tsx
└── onboardingResults → app/(onboarding)/onboardingResults.tsx
```

The tab navigator in `app/(tabs)/` exists but is **not currently wired** into the navigation tree.

### Theme System

- Colors defined in `constants/theme.ts` with light/dark palettes
- `hooks/use-theme-color.ts` resolves colors based on active scheme
- Platform-specific files use `.web.ts` / `.ios.tsx` suffixes (e.g., `use-color-scheme.web.ts`, `ui/icon-symbol.ios.tsx`)

### Key Patterns

- **Path alias**: `@/*` maps to project root (configured in `tsconfig.json`)
- **Typed routes** and **React Compiler** enabled in `app.json` experiments
- **Onboarding flow**: FlatList horizontal scroll through 5 domain questions → results screen via navigation params
- **Animations**: React Native Reanimated 4 for parallax and transitions
- **Haptic feedback**: Tab buttons use `expo-haptics`
- **App language**: French (UI text is in French)
