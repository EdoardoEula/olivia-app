import ChatInput from '@/components/ChatInput';
import Toast from '@/components/Toast';
import { useChat } from '@/hooks/useChat'; // Import the custom hook
import HomePage from '@/pages/home';
import LessonDetailPage from '@/pages/lesson_details';
import LessonsPage from '@/pages/lessons';
import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  ScrollView,
  UIManager,
  View,
  useColorScheme
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AppContainer: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<string>('home');

  const { messages, bubbleMessage, navigateToPage, loading, handleSend, setBubbleMessage } = useChat();

  const theme = useColorScheme() === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);
  const scrollViewRef = useRef<ScrollView>(null);
  const height = useHeaderHeight();

  // Effect for auto-scrolling
  useEffect(() => {
    if (messages.length > 0) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // CORRECTED: This effect now correctly listens for the navigation trigger.
  useEffect(() => {
    // This code runs only when `MapsToPage` gets a new value.
    if (navigateToPage) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCurrentPage(navigateToPage);
    }
  }, [navigateToPage]); // The dependency is now navigateToPage

  const onSend = () => {
    handleSend(inputValue);
    setInputValue(''); // Clear input after sending
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'lessons':
        return <LessonsPage />;
      case 'lesson/':
        return <LessonDetailPage />;
      case 'home':
      default:
        return <HomePage messages={messages} />;
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={height}>

        <View style={styles.contentArea}>
          {renderPage()}
        </View>

        {bubbleMessage && !loading && (
          <Toast
            message={bubbleMessage}
            onHide={() => setBubbleMessage(null)}
          />

        )}

        <ChatInput
          value={inputValue}
          onChangeText={setInputValue}
          onSend={onSend}
          loading={loading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AppContainer;