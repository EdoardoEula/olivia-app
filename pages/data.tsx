import { getThemedStyles } from '@/styles';
import { colors } from '@/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View, useColorScheme } from 'react-native';

const summaryData = {
  clientsThisWeek: 23,
  totalMessages: 157,
  frequentQuestions: [
    { id: 'q1', text: 'Come posso tracciare il mio ordine?' },
    { id: 'q2', text: 'Quali sono i metodi di pagamento accettati?' },
    { id: 'q3', text: 'È possibile effettuare un reso?' },
    { id: 'q4', text: 'È possibile effettuare un reso?' },
    { id: 'q5', text: 'È possibile effettuare un reso?' },
  ],
};

const HomePage: React.FC = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? colors.dark : colors.light;
  const styles = getThemedStyles(theme);
  return (
    // ScrollView permette di scorrere se il contenuto è più lungo dello schermo
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerTitle}>Riepilogo Attività</Text>
      <Text style={styles.headerSubtitle}>Dati aggiornati al {new Date().toLocaleDateString('it-IT')}</Text>

      {/* Card 1: Statistiche Principali */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Feather name="bar-chart-2" size={22} color="#C4816A" />
          <Text style={styles.cardTitle}>Statistiche Settimanali</Text>
        </View>
        <View style={styles.statisticRow}>
          <Text style={styles.statisticLabel}>Nuovi Clienti</Text>
          <Text style={styles.statisticValue}>{summaryData.clientsThisWeek}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statisticRow}>
          <Text style={styles.statisticLabel}>Messaggi Ricevuti</Text>
          <Text style={styles.statisticValue}>{summaryData.totalMessages}</Text>
        </View>
      </View>

      {/* Card 2: Domande Frequenti */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Feather name="help-circle" size={22} color="#C4816A" />
          <Text style={styles.cardTitle}>Domande più Frequenti</Text>
        </View>
        {summaryData.frequentQuestions.map((question, index) => (
          <View key={question.id}>
            <View style={styles.questionRow}>
              <Text style={styles.questionText}>{question.text}</Text>
            </View>
            {/* Aggiunge un divisore dopo ogni domanda tranne l'ultima */}
            {index < summaryData.frequentQuestions.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomePage;