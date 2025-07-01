import { Stack } from 'expo-router';
import React from 'react';
import useFonts from 'expo-font';

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
