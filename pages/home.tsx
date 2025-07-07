import ChatBubble from '@/components/ChatBubble';
import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import React, { forwardRef, useEffect, useRef } from 'react'; // Import forwardRef
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

// Define a type for a single message object for better type safety
interface Message {
  role: 'user' | 'agent';
  content: string;
}

// Define the list of example prompts
const examplePrompts = [
  'Pianifica una lezione',
  'Annulla una lezione',
  'Nuovo cliente',
  'Pianifica una nuova lezione ricorrente',
];

// Props no longer need the 'ref' property, as it's handled by forwardRef.
interface HomePageProps {
  messages: Message[];
  onPromptPress: (promptText: string) => void;
}

// Use forwardRef to pass the ref from the parent (AppContainer) to the ScrollView
const HomePage = forwardRef<ScrollView, HomePageProps>(({ messages, onPromptPress }, ref) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);

  const logoSource =
    scheme === 'dark'
      ? require('@/assets/images/solo_logo_white.png')
      : require('@/assets/images/solo_logo_black.png');

  const hasMessages = messages && messages.length > 0;

  const logoOpacity = useRef(new Animated.Value(hasMessages ? 0 : 1)).current;
  const messagesOpacity = useRef(new Animated.Value(hasMessages ? 1 : 0)).current;

  // Handles the fade animation.
  useEffect(() => {
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
  }, [hasMessages]);

  // Handles scrolling to the end using the forwarded ref from the parent.
  useEffect(() => {
    // Check if the ref is valid and has a 'current' property before using it.
    if (hasMessages && ref && 'current' in ref && ref.current) {
      // The timeout gives the UI a moment to render the new message before scrolling.
      setTimeout(() => {
        ref.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, hasMessages, ref]); // Dependency includes the ref to be safe.

  return (
    <View style={localStyles.container}>
      {/* Welcome screen with logo and prompts */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          localStyles.logoContainer,
          { opacity: logoOpacity },
        ]}
        pointerEvents={hasMessages ? 'none' : 'auto'}
      >
        <Image source={logoSource} style={localStyles.logo} resizeMode="contain" />
        <Text style={[localStyles.welcomeText, { color: theme.text }]}>
          Ciao! Come posso aiutarti?
        </Text>
        <View style={localStyles.promptsContainer}>
          {examplePrompts.map((prompt, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.promptBubble, { backgroundColor: theme.secondary }]}
              onPress={() => onPromptPress(prompt)}
            >
              <Text style={[localStyles.promptText, { color: theme.text }]}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* View for displaying the list of messages */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: messagesOpacity, zIndex: hasMessages ? 1 : -1 }]}>
        <ScrollView
          ref={ref} // Attach the forwarded ref directly to the ScrollView
          contentContainerStyle={localStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message.content}
              role={message.role}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
});

// Local styles for the component (unchanged)
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
    zIndex: 0,
  },
  logo: {
    width: 120,
    height: 120,
  },
  welcomeText: {
    marginTop: 20,
    marginBottom: 25,
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  promptsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  promptText: {
    fontSize: 14,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingBottom: 50,
  },
});

export default HomePage;