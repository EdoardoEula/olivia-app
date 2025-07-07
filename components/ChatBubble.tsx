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

  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

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
  const textStyle = role === 'user' ? styles.userBubbleText : styles.botBubbleText;

  // CORRECTED: The `textStyle` is removed from this array.
  // Style properties for text (like `color` or `fontSize`) do not work on a <View>.
  const containerStyles = [
    role === 'user' && styles.bubbleContainer,
    bubbleStyle,
    isDismissible && { backgroundColor: 'transparent', borderWidth: 0 },
    { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
  ];

  return (
    <Animated.View style={containerStyles.filter(Boolean)}>
      <View style={{ marginRight: isDismissible ? 25 : 0 }}>
        <MarkdownDisplay style={{ body: textStyle }}>
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