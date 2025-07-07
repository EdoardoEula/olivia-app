import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView, // Import StyleSheet
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';

// --- TYPES (as provided in the prompt) ---
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
  lista_attesa: (Participant)[];
};

type Participant = {
  id: string;
  abbonamento_id: string;
  nome: string;
  cognome:string;
};

type Ext_Partecipant = {
  id: string;
  nome: string;
  cognome: string;
  numero: string;
  email: string;
};

interface LessonsDetailsProps {
  title: string;
  content: Lesson[]; // The component will now correctly use this prop
}

// --- REFACTORED COMPONENT ---

const LessonDetailPage: React.FC<LessonsDetailsProps> = ({ title, content }) => {
  // Set up theme and styles at the top level
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  // Assuming getThemedStyles returns a structure like the one used below
  const styles = getThemedStyles(theme); 

  // The detail page should render the first lesson from the content array.
  const lesson = content?.[0];

  // A robust component should handle cases where no data is provided.
  if (!lesson) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.centered}>
          <Feather name="alert-circle" size={40} color={theme.text} />
          <Text style={styles.pageTitle}>Lezione non trovata</Text>
          <Text style={styles.detailValue}>Nessun dettaglio da mostrare.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // --- SUB-COMPONENTS ---

  const DetailRow: React.FC<{ icon: keyof typeof Feather.glyphMap; label: string; value: string | number }> = ({ icon, label, value }) => (
    <View style={styles.detailRow}>
      <Feather name={icon} size={20} color={theme.primary} style={styles.icon} />
      <View>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );

  // This component is now more flexible and can handle both internal and external participants.
  const ParticipantRow: React.FC<{ person: Participant | Ext_Partecipant }> = ({ person }) => {
    // Check if the person is an 'Ext_Partecipant' by looking for unique properties like 'email' or 'numero'.
    const isExternal = 'email' in person && 'numero' in person;
    const externalPerson = person as Ext_Partecipant; // Type assertion for easier access

    return (
      <View style={styles.participantCard}>
        <View style={styles.participantInfo}>
          <Feather name="user" size={24} color={theme.text} />
          <Text style={styles.participantName}>{`${person.nome} ${person.cognome}`}</Text>
        </View>
        {isExternal && (
            <View style={styles.contactActions}>
                {/* Conditionally render buttons only if contact info is available */}
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${externalPerson.numero}`)} style={styles.actionButton}>
                    <Feather name="phone" size={22} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${externalPerson.email}`)} style={styles.actionButton}>
                    <Feather name="mail" size={22} color={theme.primary} />
                </TouchableOpacity>
            </View>
        )}
      </View>
    );
  };
  
  // Combine all confirmed participants into one list for rendering.
  const confirmedParticipants = [...lesson.partecipanti, ...lesson.ext_partecipanti];

  // --- RENDER ---
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <View style={styles.header}>
          {/* Use the 'title' prop and data from the 'lesson' object */}
          <Text style={styles.pageTitle}>{title}</Text>
          <Text style={styles.pageSubtitle}>{lesson.disciplina}</Text>
        </View>

        {/* Lesson Details Section */}
        <View style={styles.detailsSection}>
          <DetailRow icon="calendar" label="Data" value={lesson.data} />
          <DetailRow icon="clock" label="Ora" value={`${lesson.ora_inizio} - ${lesson.ora_fine}`} />
          <DetailRow icon="user-check" label="Insegnante" value={lesson.insegnante} />
          <DetailRow icon="users" label="Posti Disponibili" value={`${lesson.tot_posti_disponibili}`} />
        </View>

        {/* Confirmed Participants Section */}
        {confirmedParticipants.length > 0 && (
          <View style={styles.participantsSection}>
            <Text style={styles.sectionTitle}>Partecipanti Confermati ({confirmedParticipants.length})</Text>
            {confirmedParticipants.map((p) => (
              <ParticipantRow key={p.id} person={p} />
            ))}
          </View>
        )}

        {/* Waiting List Section */}
        {lesson.lista_attesa.length > 0 && (
          <View style={styles.participantsSection}>
            <Text style={styles.sectionTitle}>In Lista d'Attesa ({lesson.lista_attesa.length})</Text>
            {lesson.lista_attesa.map((p) => (
              <ParticipantRow key={p.id} person={p} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LessonDetailPage;