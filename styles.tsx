import { StyleSheet } from 'react-native';
import { colors } from './theme'; // Importiamo la nostra palette centralizzata

// La nostra funzione dinamica che genera gli stili in base al tema
export const getThemedStyles = (theme: typeof colors.light) => {
  return StyleSheet.create({
    // Radice e Contenitori
    root: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
    },
    contentArea: {
      flex: 1,
    },
    scrollContainer: {
      paddingBottom: 40,
    },
    listContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    contentContainer: {
      padding: 20,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: theme.text, // or some color from your theme
    },

    // Header
    header: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 10,
    },
    pageTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.text,
    },
    pageSubtitle: {
      fontSize: 18,
      color: theme.textSecondary,
      marginTop: 4,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      marginBottom: 24,
    },

    // Card Generica
    card: {
      backgroundColor: theme.card,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme === colors.dark ? 0.3 : 0.05, // Ombra più visibile su tema scuro
      shadowRadius: 10,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      marginLeft: 8,
    },

    // Stili specifici per le lezioni
    lessonTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.text,
      flex: 1,
    },
    levelTag: {
      // Il colore di sfondo viene applicato dinamicamente nel componente
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
      marginLeft: 10,
    },
    levelText: {
      color: theme.white, // Testo sempre bianco su sfondi colorati
      fontSize: 12,
      fontWeight: 'bold',
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    lessonInstructor: {
      fontSize: 15,
      color: theme.textSecondary,
      marginLeft: 8,
    },
    lessonTime: {
      fontSize: 15,
      color: theme.textSecondary,
      marginLeft: 8,
    },

    // Sezioni e righe
    detailsSection: {
      marginTop: 20,
      paddingHorizontal: 25,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.card,
      padding: 20,
      borderRadius: 15,
      marginBottom: 15,
    },
    icon: {
      marginRight: 20,
      // Il colore dell'icona viene impostato nel componente (es. theme.primary)
    },
    detailLabel: {
      fontSize: 14,
      color: theme.textSecondary,
      fontWeight: '500',
    },
    detailValue: {
      fontSize: 17,
      color: theme.text,
      fontWeight: '600',
      marginTop: 2,
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 15,
    },

    // Partecipanti e Status
    participantsSection: {
      marginTop: 20,
      paddingHorizontal: 25,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 15,
    },
    participantCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.card,
      padding: 20,
      borderRadius: 15,
      marginBottom: 10,
    },
    participantInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    participantName: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 15,
      color: theme.text,
    },
    enrollmentStatus: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    enrollmentText: {
      fontSize: 14,
      color: theme.text,
      marginLeft: 8,
      fontWeight: '500',
    },

    // Pulsanti e Azioni
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    subscribeButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
    },
    disabledButton: {
      backgroundColor: theme.disabled,
    },
    buttonText: {
      color: theme.white,
      fontSize: 14,
      fontWeight: 'bold',
    },
    contactActions: {
      flexDirection: 'row',
    },
    actionButton: {
      marginLeft: 20,
      padding: 5,
      // Il colore dell'icona all'interno viene impostato nel componente (es. theme.primary)
    },
    closeButton: {
      padding: 5,
    },

    // Statistiche
    statisticRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
    statisticLabel: {
      fontSize: 16,
      color: theme.textSecondary,
    },
    statisticValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.primary,
    },

    // Chat / Input
    chatInputContainer: {
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: theme.background,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      backgroundColor: theme.card,
      borderRadius: 25,
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: theme.border,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      paddingHorizontal: 12,
      paddingTop: 8,
      paddingBottom: 8,
      maxHeight: 120,
    },
    sendButton: {
      marginLeft: 8,
      backgroundColor: theme.primary, // Usiamo l'accent color dalla palette
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
    },
    sendButtonDisabled: {
      backgroundColor: theme.disabled,
      elevation: 1,
    },
    bubbleContainer: {
      borderRadius: 15,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      marginHorizontal: 15,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: theme.border
    },
    bubbleText: {
      flex: 1,
      fontSize: 15,
      color: theme.text,
    },

    // Testo Domanda
    questionRow: {
      paddingVertical: 12,
    },
    questionText: {
      fontSize: 15,
      color: theme.text,
      lineHeight: 22,
    },
    userBubble: {
      backgroundColor: theme.bubblebg,
      alignSelf: 'flex-end',
      borderBottomRightRadius: 4,
    },
    botBubble: {
      alignSelf: 'flex-start',
      backgroundColor: 'transparent',
      marginHorizontal: 15,
      marginBottom: 10,
    },
    userBubbleText: {
      color: theme.text,
      fontSize: 16,
    },
    botBubbleText: {
      color: theme.text,
      fontSize: 16,
    },
    splitViewContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    chatContainerSplit: {
      flex: 1,
      borderRightWidth: 1,
      borderColor: theme.border,
    },
    pageContainerSplit: {
      flex: 1,
    },
    chatContainer: {
      flex: 1,
    },
    promptBubble: {
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: 25,
      margin: 6,
      borderWidth: 1,
      borderColor: theme.primary,
    },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    instructorName: {
      fontSize: 16,
      // color: theme.textSecondary,
    },
    dateTimeText: {
      fontSize: 14,
      // color: theme.textSecondary,
    },
    cardFooter: {
      marginTop: 8,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    statusIcon: {
      marginRight: 8,
    },
    statusText: {
      fontSize: 16,
      fontWeight: '500',
      // color: theme.text,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
    },
    emptyText: {
      marginTop: 16,
      fontSize: 16,
      color: theme.textSecondary,
    },
    headerContainer: {
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      marginBottom: 8,
    },
    toggleButton: {
      padding: 8,
    },
    calendarContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    calendarPlaceholderText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textSecondary,
      marginTop: 16,
      textAlign: 'center',
    },
    calendarSubText: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 8,
    },
    agendaContainer: {
      flex: 1,
      marginTop: 16,
      paddingHorizontal: 20,
    },
    agendaTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 12,
    },
    agendaEmptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    footerContainer: {
      // This container holds the input and the new nav bar
      borderTopWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.background,
    },
    navBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 8,
      backgroundColor: theme.background, // Or theme.background
    },
    navButton: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
    },
    navButtonText: {
      fontSize: 12,
      marginTop: 4,
      fontWeight: '500',
    },
    eventCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.background, // A slightly different background
      padding: 16,
    },
    eventText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.primary,
      marginLeft: 12,
    },
    sectionStyle: {
      // This ensures the background of the section header matches the page
      backgroundColor: theme.background,
      paddingHorizontal: 20, // Align with list content padding
    },
    agendaSectionHeader: {
      // This styles the date text (e.g., "2025-07-07")
      paddingVertical: 12,
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      backgroundColor: theme.background, // Match the page background
    },
  });
};