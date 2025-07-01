import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text } from 'react-native';

interface ToastProps {
  message: string;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onHide }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start(onHide);
      }, 2000);
    });
  }, [message, onHide, opacity]);

  return (
    <Animated.View style={[styles.toastContainer, { opacity }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
}

export default Toast;

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 100, // Adjust position based on OS to avoid overlap with input
    left: 20,
    right: 20,
    backgroundColor: '#333333', // Darker, more modern background
    borderRadius: 20, // Slightly less rounded
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  toastText: {
    color: '#E0E0E0', // Light text for dark background
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
