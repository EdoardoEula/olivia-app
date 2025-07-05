import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  loading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChangeText, onSend, loading }) => {
  const isInputEmpty = value.trim().length === 0;
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);

  return (
    <View style={styles.chatInputContainer}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          placeholder="Messaggio..."
          placeholderTextColor="#9E9E9E"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSend}
          returnKeyType="send"
          multiline
          editable={!loading} // Non editabile durante il caricamento
        />
        <TouchableOpacity
          style={[styles.sendButton, (isInputEmpty || loading) && styles.sendButtonDisabled]}
          onPress={onSend}
          disabled={isInputEmpty || loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Feather name="arrow-up" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;