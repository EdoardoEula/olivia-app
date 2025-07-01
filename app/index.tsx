import ChatBubble from '@/components/ChatBubble';
import ChatInput from '@/components/ChatInput';
import HomePage from '@/pages/home';
import LessonDetailPage from '@/pages/lesson_details';
import LessonsPage from '@/pages/lessons';
import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  useColorScheme
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppContainer: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [bubbleMessage, setBubbleMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const theme = useColorScheme() === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);

  const handleSend = () => {
    const command = inputValue.trim().toLowerCase();
    const commandIsValid = ['home', 'lessons', 'lesson'].includes(command);

    if (commandIsValid) {
      if (command !== currentPage) {
        setCurrentPage(command);
        setBubbleMessage(`Switched to the ${command.charAt(0).toUpperCase() + command.slice(1)} page.`);
      } else {
        setBubbleMessage(`You are already on the ${command.charAt(0).toUpperCase() + command.slice(1)} page.`);
      }
    } else if (command.trim() !== '') {
      setBubbleMessage(`Unknown command: "${command}". Try 'home', 'lessons', or 'settings'.`);
    } else {
      setBubbleMessage(null);
    }

    setInputValue('');
    Keyboard.dismiss();
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'lessons':
        return <LessonsPage />;
      case 'lesson':
        return <LessonDetailPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  const height = useHeaderHeight()

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={height}>

        <View style={styles.contentArea}>{renderPage()}</View>

        {bubbleMessage && (
          <ChatBubble
            message={bubbleMessage}
            onDismiss={() => setBubbleMessage(null)}
          />
        )}

        <ChatInput value={inputValue} onChangeText={setInputValue} onSend={handleSend} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AppContainer;