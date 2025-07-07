import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Keyboard, LayoutAnimation } from 'react-native';

// Define a more specific type for messages
export interface Message {
    role: 'user' | 'agent';
    content: string;
}

const BASE_URL = 'https://europe-west1-aiplatform.googleapis.com/v1beta1/projects/995739402002/locations/europe-west1/reasoningEngines/1168789656418910208';
const CHAT_ENDPOINT = `${BASE_URL}:streamQuery?alt=sse`;
const SESSION_ENDPOINT = `${BASE_URL}:query`;

// This function would fetch the auth token from your secure backend
const getAuthToken = async (): Promise<string> => {
    // In a real app, this would be a call to your backend.
    // For now, we use a placeholder.
    // IMPORTANT: Replace this with your actual token retrieval logic.
    return '';
};

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [bubbleMessage, setBubbleMessage] = useState<string | null>(null);
    const [navigateToPage, setNavigateToPage] = useState<string | null>(null);
    const [pageContent, setPageContent] = useState<[] | null>(null);
    const [pageTitle, setPageTitle] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const userId = 'react-native-user-123'; // This should be dynamic per user
    const SESSION_STORAGE_KEY = `chat_session_id_${userId}`; // Make key user-specific

    const animateLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };
    useEffect(() => {
        const manageSession = async () => {
            try {
                // 2. If not in local storage, check the backend for the user's last session
                console.log('Checking backend for existing sessions for user:', userId);
                const token = await getAuthToken();
                const listResponse = await fetch(SESSION_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ class_method: "list_sessions", input: { user_id: userId } }),
                });

                if (listResponse.ok) {
                    const resp = await listResponse.json();
                    // Assuming the API returns a sorted list of sessions, newest first
                    let data = resp["output"];
                    if (data.sessions && data.sessions.length > 0) {
                        const lastSessionId = data.sessions[0].id;
                        setSessionId(lastSessionId);
                        await AsyncStorage.setItem(SESSION_STORAGE_KEY, lastSessionId);
                        console.log('Restored last session from backend:', lastSessionId);
                        return; // Exit if found
                    }
                }

                // 3. If no sessions exist anywhere, create a new one
                console.log('No sessions found, creating a new one...');
                const createResponse = await fetch(SESSION_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ class_method: "create_session", input: { user_id: userId } }),
                });

                if (createResponse.ok) {
                    const data = await createResponse.json();
                    const newSessionId = data.id;
                    if (newSessionId) {
                        setSessionId(newSessionId);
                        await AsyncStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
                        console.log('Created and saved new session:', newSessionId);
                    }
                } else {
                    console.error('Error creating session:', await createResponse.text());
                }

            } catch (e) {
                console.error('Failed to manage session:', e);
            }
        };

        manageSession();
    }, [userId]); // Dependency on userId ensures a new user gets their own session


    // 🚀 CORRECTED: Message sending and stream handling
    const handleSend = useCallback(async (inputValue: string) => {
        if (inputValue.trim() === '' || loading || !sessionId) return;

        Keyboard.dismiss();
        animateLayout();

        const userMessage: Message = { role: 'user', content: inputValue };
        // Add a placeholder for the agent's response
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);

        try {
            const token = await getAuthToken();
            const response = await fetch(CHAT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    class_method: "stream_query",
                    input: {
                        message: inputValue,
                        session_id: sessionId,
                        user_id: userId
                    },
                }),
            });


            if (!response.ok) {
                throw new Error(`API Error: ${await response.text()}`);
            }

            // 1. Get the entire response body as a single string.
            const responseText = await response.text();
            console.log(responseText);

            // 2. Split the string into an array of JSON strings.
            const jsonStrings = responseText.trim().split('\n');

            // 3. Get the very last line, which should be the final JSON object.
            const lastJsonString = jsonStrings[jsonStrings.length - 1];

            if (lastJsonString) {
                try {
                    // 4. Parse only the last JSON object.
                    const lastMessageData = JSON.parse(lastJsonString);
                    const newText = lastMessageData.content?.parts?.[0]?.text;

                    // 5. If it contains text, update the UI.
                    if (newText) {
                        animateLayout();
                        try {
                            // Attempt to parse the response as a JSON command
                            const innerJsonString = newText.replace(/^```json\s*|```$/g, '');
                            const parsed = JSON.parse(innerJsonString);
                            const navigateTo = parsed.navigate_to;
                            const messaggio = parsed.messaggio;

                            // Check if it's a valid navigation command
                            if (navigateTo && messaggio) {

                                if(navigateTo != "home") {
                                    const content = parsed.content;
                                    const titolo = parsed.titolo;
                                    setPageContent(content);
                                    setPageTitle(titolo);
                                    const agentMessage: Message = { role: 'agent', content: "Navigazione in corso..." };
                                    setMessages(prev => [...prev, agentMessage]); // CORRECTED: Appends message
                                    animateLayout();
                                    setTimeout(() => {
                                        setNavigateToPage(navigateTo);
                                        setBubbleMessage(messaggio);
                                        setMessages(prev => [...prev, messaggio]);
                                    }, 1000);
                                } else {
                                    const agentMessage: Message = { role: 'agent', content: messaggio };
                                    setNavigateToPage("home");
                                    setMessages(prev => [...prev, agentMessage]);
                                    animateLayout();
                                }

                            } else {
                                // The JSON was invalid or didn't contain navigation, treat as text
                                throw new Error("Not a valid navigation command.");
                            }
                        } catch (e) {
                            // This is a regular text response, not a navigation command
                            const agentMessage: Message = { role: 'agent', content: newText };
                            setMessages(prev => [...prev, agentMessage]); // CORRECTED: Appends message
                        }

                    }
                } catch (e) {
                    console.error('Failed to parse the last JSON object from the response:', e);
                }
            }

        } catch (error) {
            console.error('Failed to fetch from agent:', error);
            const errorMessage: Message = { role: 'agent', content: 'An error occurred. Please try again.' };
            animateLayout();
            setMessages(prev => [...prev.slice(0, -1), errorMessage]);
        } finally {
            animateLayout();
            setLoading(false);
        }
    }, [loading, sessionId, userId]);

    return { messages, bubbleMessage, navigateToPage, pageContent, pageTitle, loading, handleSend, setBubbleMessage, setMessages };
};