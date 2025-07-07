import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from 'react-native';

// --- TIPI DI DATI ---
// Tipo per i partecipanti, semplificato per questo esempio
type Participant = {
  id: string;
  nome: string;
  cognome: string;
};

// Tipo per la ricorrenza, basato sul JSON fornito
type Ricorrenza = {
  id: string;
  data_inizio: string;
  data_fine: string;
  giorno_settimana: string;
  ora_inizio: string;
  ora_fine: string;
  insegnante: string;
  disciplina: string;
  tot_posti_disponibili: number;
  partecipanti: Participant[];
};

// --- DATI MOCK ---
const MOCK_RICORRENZE: Ricorrenza[] = [
  {
    id: 'rec_1',
    data_inizio: '01-09-2024',
    data_fine: '30-06-2025',
    giorno_settimana: 'Lunedì',
    ora_inizio: '18:30',
    ora_fine: '19:30',
    insegnante: 'Elena Rossi',
    disciplina: 'Yoga Vinyasa',
    tot_posti_disponibili: 15,
    partecipanti: new Array(12).fill(null).map((_, i) => ({ id: `p${i}`, nome: 'Nome', cognome: `Utente ${i}` })),
  },
  {
    id: 'rec_2',
    data_inizio: '01-09-2024',
    data_fine: '30-06-2025',
    giorno_settimana: 'Mercoledì',
    ora_inizio: '19:00',
    ora_fine: '20:00',
    insegnante: 'Marco Bianchi',
    disciplina: 'Pilates Matwork',
    tot_posti_disponibili: 10,
    partecipanti: new Array(10).fill(null).map((_, i) => ({ id: `p${i}`, nome: 'Nome', cognome: `Utente ${i}` })),
  },
  {
    id: 'rec_3',
    data_inizio: '02-09-2024',
    data_fine: '20-12-2024',
    giorno_settimana: 'Venerdì',
    ora_inizio: '13:00',
    ora_fine: '14:00',
    insegnante: 'Luca Verdi',
    disciplina: 'Functional Training',
    tot_posti_disponibili: 12,
    partecipanti: new Array(5).fill(null).map((_, i) => ({ id: `p${i}`, nome: 'Nome', cognome: `Utente ${i}` })),
  },
  {
    id: 'rec_4',
    data_inizio: '01-10-2024',
    data_fine: '31-05-2025',
    giorno_settimana: 'Martedì',
    ora_inizio: '10:00',
    ora_fine: '11:00',
    insegnante: 'Giulia Neri',
    disciplina: 'Ginnastica Posturale',
    tot_posti_disponibili: 8,
    partecipanti: [],
  },
];

// --- COMPONENTE SCHEDA RICORRENZA ---
interface RecurrenceCardProps {
  item: Ricorrenza;
  styles: any; // Stili tematici passati come prop
  theme: typeof colors.light; // Tema colori passato come prop
  onPress: () => void;
}

const RecurrenceCard: React.FC<RecurrenceCardProps> = ({ item, styles, theme, onPress }) => {
  const postiOccupati = item.partecipanti.length;
  const postiRimanenti = item.tot_posti_disponibili - postiOccupati;

  const getAvailabilityStyle = () => {
    if (postiRimanenti === 0) return styles.statusEsaurito;
    if (postiRimanenti <= 3) return styles.statusPochi;
    return styles.statusDisponibile;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Intestazione Scheda */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.disciplina}</Text>
        <Text style={styles.cardSubtitle}>{`${item.giorno_settimana}, ${item.ora_inizio} - ${item.ora_fine}`}</Text>
      </View>

      {/* Dettagli Scheda */}
      <View style={styles.cardBody}>
        <View style={styles.detailRow}>
          <Feather name="user-check" size={16} color={theme.textSecondary} />
          <Text style={styles.detailText}>{item.insegnante}</Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="calendar" size={16} color={theme.textSecondary} />
          <Text style={styles.detailText}>{`Dal ${item.data_inizio} al ${item.data_fine}`}</Text>
        </View>
      </View>

      {/* Footer Scheda */}
      <View style={styles.cardFooter}>
        <Text style={[styles.availabilityText, getAvailabilityStyle()]}>
          {postiRimanenti} / {item.tot_posti_disponibili} posti disponibili
        </Text>
        <Feather name="chevron-right" size={24} color={theme.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};

// --- COMPONENTE PAGINA PRINCIPALE ---
const RecurringLessonsPage: React.FC = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);

  const handleCardPress = (id: string) => {
    console.log(`Naviga ai dettagli della ricorrenza con ID: ${id}`);
    // Qui andrebbe inserita la logica di navigazione (es. navigation.navigate('RecurringLessonDetail', { id }))
  };

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={MOCK_RICORRENZE}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.pageTitle}>Lezioni Ricorrenti</Text>
          </View>
        }
        renderItem={({ item }) => (
          <RecurrenceCard 
            item={item} 
            styles={styles} 
            theme={theme}
            onPress={() => handleCardPress(item.id)} 
          />
        )}
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Feather name="info" size={30} color={theme.textSecondary} />
                <Text style={styles.emptyText}>Nessuna lezione ricorrente trovata.</Text>
            </View>
        }
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};