import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, TouchableOpacity, useColorScheme, View } from 'react-native';
import MarkdownDisplay from 'react-native-markdown-display';

interface ChatBubbleProps {
  message: string;
  role: 'user' | 'agent';
  onDismiss?: () => void;
  isDismissible?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, role, onDismiss, isDismissible = false }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);

  // Animation refs
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Entrance animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  }, []);


  const bubbleStyle = role === 'user' ? styles.userBubble : styles.botBubble;

  // Build the style array conditionally
  const containerStyles = [
    // The main bubble container style is applied ONLY to the user
    role === 'user' && styles.bubbleContainer,

    // Apply the role-specific style (userBubble or botBubble)
    bubbleStyle,

    // If dismissible, override to ensure no background or border
    isDismissible && { backgroundColor: 'transparent', borderWidth: 0 },

    // Apply animations
    { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
  ];


  return (
    // Use the conditionally built style array.
    // .filter(Boolean) removes any 'false' values from the array.
    <Animated.View style={containerStyles.filter(Boolean)}>
      {/* Wrap the markdown to add spacing and prevent it from going under the button */}
      <View style={{ marginRight: isDismissible ? 25 : 0 }}>
        <MarkdownDisplay>
          {message}
        </MarkdownDisplay>
      </View>

      {isDismissible && (
        <TouchableOpacity
          onPress={onDismiss}
          style={[styles.closeButton, { position: 'absolute', top: 5, right: 5 }]}
        >
          <Feather name="x" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default ChatBubble;