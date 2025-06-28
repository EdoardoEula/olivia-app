import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from '../components/Toast';

// --- Page Components ---
// We are defining the pages within this file for a centralized structure.

const HomePage: React.FC = () => (
  <View style={styles.pageContainer}>
    <Feather name="home" size={64} color="#555" />
    <Text style={styles.pageTitle}>Home</Text>
    <Text style={styles.pageSubtitle}>Welcome to your dashboard.</Text>
  </View>
);

const LessonsPage: React.FC = () => (
  <View style={styles.pageContainer}>
    <Feather name="book-open" size={64} color="#555" />
    <Text style={styles.pageTitle}>Lessons</Text>
    <Text style={styles.pageSubtitle}>Start your learning journey.</Text>
  </View>
);

const SettingsPage: React.FC = () => (
  <View style={styles.pageContainer}>
    <Feather name="settings" size={64} color="#555" />
    <Text style={styles.pageTitle}>Settings</Text>
    <Text style={styles.pageSubtitle}>Configure your application.</Text>
  </View>
);


// --- Main App Component ---
// This component now manages the entire app state and navigation.
const AppContainer: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('home'); // Manages which page is visible

  /**
   * Handles the logic for sending a command from the chat input.
   */
  const handleSend = () => {
    const command = inputValue.trim().toLowerCase();
    
    // Checks for a valid page command
    if (['home', 'lessons', 'settings'].includes(command)) {
      if (command !== currentPage) {
        setCurrentPage(command);
        setToastMessage(`Navigating to ${command.charAt(0).toUpperCase() + command.slice(1)}...`);
      } else {
        setToastMessage(`You are already on the ${command} page.`);
      }
    } else if (command !== '') {
      setToastMessage(`Unknown command: "${command}"`);
    }
    
    setInputValue(''); // Clears the input field
  };

  /**
   * Renders the current page based on the state.
   */
  const renderPage = () => {
    switch (currentPage) {
      case 'lessons':
        return <LessonsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* The main content area renders the selected page */}
        <View style={styles.mainContent}>
          {renderPage()}
        </View>

        {toastMessage && (
            <Toast 
                message={toastMessage} 
                onHide={() => setToastMessage(null)}
            />
        )}

        {/* The chat input is always visible at the bottom */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type 'home', 'lessons', or 'settings'..."
              placeholderTextColor="#999"
              value={inputValue}
              onChangeText={setInputValue}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Feather name="arrow-up" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  mainContent: {
    flex: 1,
  },
  // Page Styles
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pageTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  pageSubtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
  // Input Wrapper Styles
  inputWrapper: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 5,
    backgroundColor: '#f4f4f8',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
