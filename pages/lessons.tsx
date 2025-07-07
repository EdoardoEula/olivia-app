import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { FlatList, ListRenderItem, Text, View, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- TYPES (Unchanged) ---
type Participant = { id: string };
type Ext_Partecipant = { id: string };

type Lesson = {
  id: string;
  disciplina: string;
  insegnante: string;
  tot_posti_disponibili: number;
  data: string;
  ora_inizio: string;
  ora_fine: string;
  partecipanti: Participant[];
  ext_partecipanti: Ext_Partecipant[];
  lista_attesa: Participant[];
};

// --- HELPER FUNCTION (Simplified) ---
const formatDate = (dateString: string) => {
    // This function can be simplified if all dates in this component are uniform
    const date = new Date(dateString); 
    return new Intl.DateTimeFormat('it-IT', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
};

// --- LESSON TILE COMPONENT (Unchanged) ---
const LessonTile: React.FC<{ item: Lesson; theme: any }> = ({ item, theme }) => {
  const styles = getThemedStyles(theme);
  const enrolledCount = item.partecipanti.length + item.ext_partecipanti.length;
  const waitingListCount = item.lista_attesa.length;
  
  return (
    <View style={styles.card}>
      <View style={styles.infoRow}>
        <Text style={styles.lessonTitle}>{item.disciplina}</Text>
        <Text style={styles.instructorName}>{item.insegnante}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.dateTimeText}>{formatDate(item.data)}</Text>
        <Text style={styles.dateTimeText}>{item.ora_inizio}-{item.ora_fine}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.cardFooter}>
        <View style={styles.statusRow}>
            <Feather name="users" size={16} color={theme.text} style={styles.statusIcon} />
            <Text style={styles.statusText}>Iscritti: {enrolledCount}/{item.tot_posti_disponibili}</Text>
        </View>
        {waitingListCount > 0 && (
            <View style={styles.statusRow}>
                <Feather name="clock" size={16} color={theme.text} style={styles.statusIcon} />
                <Text style={styles.statusText}>In lista d'attesa: {waitingListCount}</Text>
            </View>
        )}
      </View>
    </View>
  );
};


// --- MAIN PAGE COMPONENT (Simplified) ---
interface LessonsPageProps {
  title: string;
  content: Lesson[];
}

const LessonsPage: React.FC<LessonsPageProps> = ({ title, content }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);

  const renderLesson: ListRenderItem<Lesson> = ({ item }) => (
    <LessonTile item={item} theme={theme} />
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>{title}</Text>
        </View>
        <FlatList
          data={content}
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