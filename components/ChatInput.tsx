// src/components/ChatInput.tsx
import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChangeText, onSend }) => {
  // -> The input is considered invalid if it's empty after trimming whitespace.
  const isInputEmpty = value.trim().length === 0;
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);
  return (
    <View style={styles.chatInputContainer}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          placeholder="Messaggio"
          placeholderTextColor="#9E9E9E"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSend}
          returnKeyType="send"
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, isInputEmpty && styles.sendButtonDisabled]}
          onPress={onSend}
          // -> The button is disabled when the input is empty.
          disabled={isInputEmpty}>
          <Feather name="arrow-up" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default ChatInput;