import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- TYPES & MOCK DATA (No Changes) ---
type Lesson = {
  id: string;
  title: string;
  instructor: string;
  time: string;
  enrolled: number;
  spots: number;
  level: string;
};
const mockLessons: Lesson[] = [
  { id: '1', title: 'Pilates Mattutino', instructor: 'Giulia Rossi', time: '08:00', enrolled: 8, spots: 12, level: 'Principiante' },
  { id: '2', title: 'Reformer Avanzato', instructor: 'Marco Bianchi', time: '18:30', enrolled: 10, spots: 10, level: 'Avanzato' },
  { id: '3', title: 'Pilates & Yoga Fusion', instructor: 'Sara Verdi', time: '13:00', enrolled: 5, spots: 15, level: 'Intermedio' },
];


// --- LESSON TILE COMPONENT (Updated to be Theme-Aware) ---
type LessonTileProps = {
  item: Lesson;
  theme: typeof colors.light; // It now accepts the theme as a prop
};
const LessonTile: React.FC<LessonTileProps> = ({ item, theme }) => {
  const isFull = item.enrolled >= item.spots;
  const styles = getThemedStyles(theme); // Generate styles based on the passed theme

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        {/* 🎨 Dynamic background color */}
        <View style={[styles.levelTag, { backgroundColor: isFull ? theme.disabled : theme.primary }]}>
          <Text style={styles.levelText}>{item.level}</Text>
        </View>
      </View>
      {/* 🎨 Dynamic icon colors */}
      <View style={styles.infoRow}><Feather name="user" size={16} color={theme.textSecondary} /><Text style={styles.lessonInstructor}>{item.instructor}</Text></View>
      <View style={styles.infoRow}><Feather name="clock" size={16} color={theme.textSecondary} /><Text style={styles.lessonTime}>{item.time}</Text></View>
      <View style={styles.divider} />
      <View style={styles.footer}>
        <View style={styles.enrollmentStatus}><Feather name="users" size={16} color={theme.text} /><Text style={styles.enrollmentText}>Iscritti: {item.enrolled} / {item.spots}</Text></View>
        <TouchableOpacity style={[styles.subscribeButton, isFull && styles.disabledButton]} disabled={isFull}>
          <Text style={styles.buttonText}>{isFull ? 'Completo' : 'Iscriviti'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


// --- MAIN PAGE COMPONENT (Correctly handles hooks and passes props) ---
const LessonsPage: React.FC = () => {
  // ✅ Hooks are now called correctly inside the component
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);

  // The render function now passes the theme to each tile
  const renderLesson: ListRenderItem<Lesson> = ({ item }) => (
    <LessonTile item={item} theme={theme} />
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Lezioni di Oggi</Text>
        </View>

        <FlatList
          style={{ flex: 1 }}
          data={mockLessons}
          renderItem={renderLesson}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default LessonsPage;