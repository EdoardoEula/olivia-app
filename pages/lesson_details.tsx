import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

// --- TYPES AND MOCK DATA (No changes here) ---
type LessonDetail = {
  id: string;
  title: string;
  instructor: string;
  time: string;
  date: string;
  level: string;
  discipline: string;
};

type Participant = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

const mockLessonDetail: LessonDetail = {
  id: '1',
  title: 'Lezione di Gruppo',
  instructor: 'Giulia Rossi',
  time: '08:00',
  date: 'Martedì 15 Ottobre',
  level: 'Principiante',
  discipline: 'Matwork',
};

const mockParticipants: Participant[] = [
  { id: '1', name: 'Mario Rossi', phone: '3331234567', email: 'mario.rossi@example.com' },
  { id: '2', name: 'Laura Bianchi', phone: '3477654321', email: 'laura.bianchi@example.com' },
  { id: '3', name: 'Simone Verdi', phone: '3289876543', email: 'simone.verdi@example.com' },
  { id: '4', name: 'Chiara Neri', phone: '3391122334', email: 'chiara.neri@example.com' },
  { id: '5', name: 'Luca Gialli', phone: '3456789012', email: 'luca.gialli@example.com' },
];

// --- MAIN COMPONENT ---
const LessonDetailPage: React.FC = () => {
  // Set up theme and styles at the top level
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);

  // --- SUB-COMPONENTS (Defined inside the main component to access theme and styles) ---

  const DetailRow: React.FC<{ icon: keyof typeof Feather.glyphMap; label: string; value: string }> = ({ icon, label, value }) => (
    <View style={styles.detailRow}>
      {/* 🎨 Use dynamic theme color */}
      <Feather name={icon} size={20} color={theme.primary} style={styles.icon} />
      <View>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );

  const ParticipantRow: React.FC<{ participant: Participant }> = ({ participant }) => (
    <View style={styles.participantCard}>
      <View style={styles.participantInfo}>
        {/* 🎨 Use dynamic theme color */}
        <Feather name="user" size={24} color={theme.text} />
        <Text style={styles.participantName}>{participant.name}</Text>
      </View>
      <View style={styles.contactActions}>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${participant.phone}`)} style={styles.actionButton}>
          {/* 🎨 Use dynamic theme color */}
          <Feather name="phone" size={22} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${participant.email}`)} style={styles.actionButton}>
          {/* 🎨 Use dynamic theme color */}
          <Feather name="mail" size={22} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- RENDER ---
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>{mockLessonDetail.title}</Text>
          <Text style={styles.pageSubtitle}>{mockLessonDetail.discipline}</Text>
        </View>

        {/* Sezione Dettagli Lezione */}
        <View style={styles.detailsSection}>
          <DetailRow icon="calendar" label="Data" value={mockLessonDetail.date} />
          <DetailRow icon="clock" label="Ora" value={mockLessonDetail.time} />
          <DetailRow icon="user" label="Insegnante" value={mockLessonDetail.instructor} />
          <DetailRow icon="bar-chart-2" label="Livello" value={mockLessonDetail.level} />
        </View>

        {/* Sezione Partecipanti */}
        <View style={styles.participantsSection}>
          <Text style={styles.sectionTitle}>Partecipanti</Text>
          {mockParticipants.map(participant => (
            <ParticipantRow key={participant.id} participant={participant} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LessonDetailPage;