import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';

interface ChatBubbleProps {
  message: string;
  onDismiss: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onDismiss }) => {
  // 1. Get the current theme and generate styles
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);

  // 2. ✅ Added the required "return" statement
  return (
    <View style={styles.bubbleContainer}>
      <Text style={styles.bubbleText}>{message}</Text>
      <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
        {/* 3. 🎨 Use a dynamic color from the theme */}
        <Feather name="x" size={20} color={theme.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatBubble;