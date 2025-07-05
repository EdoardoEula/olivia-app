import ChatBubble from '@/components/ChatBubble';
import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

// Define a type for a single message object for better type safety
interface Message {
  role: 'user' | 'agent';
  content: string;
}

interface HomePageProps {
  messages: Message[]; // The component now expects an array of messages
}

const HomePage: React.FC<HomePageProps> = ({ messages }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme); // Assuming this provides themed styles

  const scrollViewRef = useRef<ScrollView>(null);

  // Determine which logo to use based on the color scheme
  const logoSource =
    scheme === 'dark'
      ? require('@/assets/images/solo_logo_white.png')
      : require('@/assets/images/solo_logo_black.png');

  // Check if there are any messages to display
  const hasMessages = messages && messages.length > 0;

  // Set up animated values for opacity.
  // Show logo if no messages, otherwise show messages.
  const logoOpacity = useRef(new Animated.Value(hasMessages ? 0 : 1)).current;
  const messagesOpacity = useRef(new Animated.Value(hasMessages ? 1 : 0)).current;

  // Effect to handle animations when the message list changes
  useEffect(() => {
    // Animate opacity based on whether messages exist
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: hasMessages ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(messagesOpacity, {
        toValue: hasMessages ? 1 : 0,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // If messages are present, scroll to the end of the list
    if (hasMessages) {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 300);
    }
  }, [hasMessages, logoOpacity, messagesOpacity]);

  return (
    <View style={localStyles.container}>
      {/* Welcome screen with logo, visible only when there are no messages */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          localStyles.logoContainer,
          { opacity: logoOpacity },
        ]}
        pointerEvents={hasMessages ? 'none' : 'auto'} // Disable interaction when hidden
      >
        <Image source={logoSource} style={localStyles.logo} resizeMode="contain" />
        <Text style={[localStyles.welcomeText, { color: theme.text }]}>
          Ciao! Come posso aiutarti?
        </Text>
      </Animated.View>

      {/* View for displaying the list of messages */}
      {hasMessages && (
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: messagesOpacity }]}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={localStyles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            {/* Map through messages and render each one using the ChatBubble component */}
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                message={message.content}
                role={message.role}
              />
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

// Local styles for the component
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  agentMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
});

export default HomePage;
