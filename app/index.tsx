import ChatInput from '@/components/ChatInput';
import Toast from '@/components/Toast';
import { useChat } from '@/hooks/useChat';
import CalendarPage from '@/pages/calendar';
import HomePage from '@/pages/home';
import LessonDetailPage from '@/pages/lesson_details';
import LessonsPage from '@/pages/lessons';
import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { Feather } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
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

  const { messages, bubbleMessage, navigateToPage, pageContent, pageTitle, loading, handleSend, setBubbleMessage } = useChat();

  const theme = useColorScheme() === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);
  const scrollViewRef = useRef<ScrollView>(null);
  const height = useHeaderHeight();
  
  interface Message {
    role: 'user' | 'agent';
    content: string;
  }

  const handlePromptPress = (promptText: string) => {
    const newUserMessage: Message = { role: 'user', content: promptText };
    handleSend(newUserMessage.content);
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    if (navigateToPage) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCurrentPage(navigateToPage);
    }
  }, [navigateToPage]);

  const onSend = () => {
    handleSend(inputValue);
    setInputValue('');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'lessons':
        return <LessonsPage title={pageTitle!} content={pageContent!} />;
      case 'lesson':
        return <LessonDetailPage title={pageTitle!} content={pageContent!} />;
      case 'calendar':
        return <CalendarPage />;
      case 'home':
      default:
        // Pass the ref only to HomePage where it's actually used
        return <HomePage ref={scrollViewRef} messages={messages} onPromptPress={handlePromptPress} />;
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={height}
      >
        {/* Main Content Area */}
        <View style={styles.contentArea}>
          {renderPage()}
        </View>

        {/* Input & Navigation Footer */}
        <View style={styles.footerContainer}>
          <ChatInput
            value={inputValue}
            onChangeText={setInputValue}
            onSend={onSend}
            loading={loading}
          />
          {/* Bottom Navigation Bar */}
          <View style={styles.navBarContainer}>
            <TouchableOpacity style={styles.navButton} onPress={() => setCurrentPage('home')}>
              <Feather name="home" size={24} color={currentPage === 'home' ? theme.primary : theme.textSecondary} />
              <Text style={[styles.navButtonText, { color: currentPage === 'home' ? theme.primary : theme.textSecondary }]}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={() => setCurrentPage('calendar')}>
              <Feather name="calendar" size={24} color={currentPage === 'calendar' ? theme.primary : theme.textSecondary} />
              <Text style={[styles.navButtonText, { color: currentPage === 'calendar' ? theme.primary : theme.textSecondary }]}>
                Calendario
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Toast Notification */}
        {bubbleMessage && !loading && (
          <Toast
            message={bubbleMessage}
            onHide={() => setBubbleMessage(null)}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AppContainer;