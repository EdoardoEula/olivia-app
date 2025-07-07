import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { Feather } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    Text,
    View,
    useColorScheme
} from 'react-native';
// Import the required components from react-native-calendars
import {
    AgendaList,
    CalendarProvider,
    ExpandableCalendar
} from 'react-native-calendars';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- TYPES ---
type Participant = { id: string };
type Ext_Partecipant = { id: string };

type CalendarEvent = {
  id: string;
  eventType: 'lesson' | 'studioEvent';
  data: string; // YYYY-MM-DD
  disciplina?: string;
  insegnante?: string;
  tot_posti_disponibili?: number;
  ora_inizio?: string;
  ora_fine?: string;
  partecipanti?: Participant[];
  ext_partecipanti?: Ext_Partecipant[];
  lista_attesa?: Participant[];
  eventName?: string;
};

// --- MOCK DATA (Updated for current date) ---
const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    eventType: 'lesson',
    disciplina: 'Yoga Flow',
    insegnante: 'Mario Rossi',
    tot_posti_disponibili: 20,
    data: '2025-07-07', // Today
    ora_inizio: '18:00',
    ora_fine: '19:00',
    partecipanti: Array.from({ length: 18 }, (_, i) => ({ id: `p${i}` })),
    ext_partecipanti: [],
    lista_attesa: [],
  },
  {
    id: '2',
    eventType: 'lesson',
    disciplina: 'Pilates Advanced',
    insegnante: 'Anna Bianchi',
    tot_posti_disponibili: 15,
    data: '2025-07-07', // Today
    ora_inizio: '19:30',
    ora_fine: '20:30',
    partecipanti: Array.from({ length: 15 }, (_, i) => ({ id: `p${i}` })),
    ext_partecipanti: [],
    lista_attesa: Array.from({ length: 3 }, (_, i) => ({ id: `w${i}` })),
  },
  {
    id: '3',
    eventType: 'studioEvent',
    eventName: 'CHIUSURA ESTIVA',
    data: '2025-08-15',
  },
  {
    id: '4',
    eventType: 'lesson',
    disciplina: 'Yoga Base',
    insegnante: 'Mario Rossi',
    tot_posti_disponibili: 20,
    data: '2025-07-09', // Wednesday
    ora_inizio: '18:00',
    ora_fine: '19:00',
    partecipanti: Array.from({ length: 12 }, (_, i) => ({ id: `p${i}` })),
    ext_partecipanti: [],
    lista_attesa: [],
  },
];

// --- HELPER FUNCTIONS ---
const getToday = () => new Date().toISOString().split('T')[0];

// --- CHILD COMPONENTS ---
const LessonTile: React.FC<{ item: CalendarEvent; theme: any }> = ({ item, theme }) => {
  const styles = getThemedStyles(theme);
  const enrolledCount = (item.partecipanti?.length ?? 0) + (item.ext_partecipanti?.length ?? 0);
  const waitingListCount = item.lista_attesa?.length ?? 0;

  return (
    <View style={styles.card}>
      <View style={styles.infoRow}>
        <Text style={styles.lessonTitle}>{item.disciplina}</Text>
        <Text style={styles.instructorName}>{item.insegnante}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.dateTimeText}>{item.ora_inizio} - {item.ora_fine}</Text>
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

const EventTile: React.FC<{ item: CalendarEvent; theme: any }> = ({ item, theme }) => {
    const styles = getThemedStyles(theme);
    return (
        <View style={[styles.card, styles.eventCard]}>
            <Feather name="info" size={20} color={theme.primary} />
            <Text style={styles.eventText}>{item.eventName}</Text>
        </View>
    );
};

// --- MAIN CALENDAR PAGE COMPONENT ---
const CalendarPage: React.FC = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);

  const [allEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);

  // Group events by date for the AgendaList
  const sections = useMemo(() => {
    const grouped: { [key: string]: CalendarEvent[] } = {};
    allEvents.forEach(event => {
      const dateKey = event.data;
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });

    return Object.keys(grouped).map(dateKey => ({
      title: dateKey,
      data: grouped[dateKey],
    }));
  }, [allEvents]);

  // Mark dates that have events
  const markedDates = useMemo(() => {
    const markings: { [key: string]: any } = {};
    allEvents.forEach(event => {
      const isStudioEvent = event.eventType === 'studioEvent';
      markings[event.data] = {
        marked: true,
        // Use a different color for studio events vs regular lessons
        dotColor: isStudioEvent ? theme.accent : theme.primary, 
      };
    });
    return markings;
  }, [allEvents, theme]);
  
  // Render item for the AgendaList
  const renderItem = ({ item }: { item: CalendarEvent }) => {
    if (item.eventType === 'lesson') {
      return <LessonTile item={item} theme={theme} />;
    }
    if (item.eventType === 'studioEvent') {
      return <EventTile item={item} theme={theme} />;
    }
    return null;
  };

  // Helper to format the date in the agenda header
  const formatAgendaDate = (dateString: string) => {
    const date = new Date(dateString);
    // Add timezone offset to prevent date from being off by one day
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const correctedDate = new Date(date.getTime() + userTimezoneOffset);

    return new Intl.DateTimeFormat('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(correctedDate);
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
          <View style={styles.header}>
              <Text style={styles.pageTitle}>Calendario</Text>
          </View>
          {/* CalendarProvider manages the state for the expandable calendar and agenda */}
          <CalendarProvider date={getToday()}>
              <ExpandableCalendar
                  theme={{
                      backgroundColor: theme.background,
                      calendarBackground: theme.background,
                      textSectionTitleColor: theme.textSecondary,
                      selectedDayBackgroundColor: theme.primary,
                      selectedDayTextColor: '#ffffff',
                      todayTextColor: theme.primary,
                      dayTextColor: theme.text,
                      textDisabledColor: theme.textSecondary,
                      arrowColor: theme.primary,
                      monthTextColor: theme.text,
                      indicatorColor: theme.primary,
                      dotColor: theme.primary,
                      selectedDotColor: '#ffffff',
                  }}
                  markedDates={markedDates}
                  firstDay={1} // Monday as the first day of the week
                  // Allow the calendar to be closed by swiping up on the agenda
                  closeOnDayPress={false} 
              />
              <AgendaList
                  sections={sections}
                  renderItem={renderItem}
                  sectionStyle={styles.sectionStyle}
              />
          </CalendarProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CalendarPage;
