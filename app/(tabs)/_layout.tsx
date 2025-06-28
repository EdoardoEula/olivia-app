import { Feather } from '@expo/vector-icons';
import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CustomToastProps {
  routeName: string | undefined;
}

const CustomToast: React.FC<CustomToastProps> = ({ routeName }) => {
  if (!routeName) return null;
  const message = `You are on the ${routeName.charAt(0).toUpperCase() + routeName.slice(1)} page`;
  return (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
};

const TabsLayout: React.FC = () => {
  const pathname = usePathname();
  const routeName = pathname.split('/').pop();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            backgroundColor: '#ffffff',
            borderRadius: 15,
            height: 60,
            ...styles.shadow
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean; }) => (
              <Feather name="home" color={focused ? '#007AFF' : color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="lessons"
          options={{
            tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean; }) => (
              <Feather name="book-open" color={focused ? '#007AFF' : color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean; }) => (
              <Feather name="settings" color={focused ? '#007AFF' : color} size={size} />
            ),
          }}
        />
      </Tabs>
      <CustomToast routeName={routeName} />
    </>
  );
}

export default TabsLayout;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  toastContainer: {
    position: 'absolute',
    top: 60, 
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 10,
  },
  toastText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
