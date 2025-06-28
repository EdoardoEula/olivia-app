import { Stack } from 'expo-router';
import React from 'react';

/**
 * This is the root layout for the entire application.
 * It sets up a Stack navigator to manage the screens.
 * By defining this file, we take control from the default
 * expo-router layout, which resolves the error.
 */
const RootLayout: React.FC = () => {
  return (
    <Stack>
      {/* The screen for our main app component. 
          The header is hidden to maintain the desired UI. */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

export default RootLayout;
