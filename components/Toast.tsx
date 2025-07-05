import { Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface ToastProps {
  message: string;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onHide }) => {
  // Use a shared value for the entrance animation
  const opacity = useSharedValue(0);

  // Define the animated style for the fade-in effect
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // Trigger the entrance animation when the component mounts
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, [opacity]);

  return (
    <Animated.View style={[styles.toastContainer, animatedStyle]}>
      <Text style={styles.toastText}>{message}</Text>
      
      {/* "X" button to close the toast */}
      <TouchableOpacity style={styles.closeButton} onPress={onHide}>
        <Feather name="x" size={20} color="#E0E0E0" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 100,
    left: 20,
    right: 20,
    backgroundColor: '#333333',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    // Flexbox properties to align text and button
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toastText: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    // Ensure text doesn't push the button off-screen
    flex: 1, 
    marginRight: 10,
  },
  closeButton: {
    // Provides a larger, easier-to-press area
    padding: 5, 
  },
});