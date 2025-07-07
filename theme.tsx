/**
 * Questo file definisce la palette di colori dell'applicazione,
 * basata sulla palette "Olivia".
 * Contiene le definizioni sia per il tema chiaro (light) che per quello scuro (dark),
 * con una versione del tema scuro migliorata per leggibilità e gerarchia visiva.
 */

// Definiamo i colori base della palette per un facile accesso.
// Ho aggiunto alcune tonalità specifiche per il tema scuro per migliorare la coerenza.
const palette = {
  // Colori originali
  offWhite: '#F2F7F7',
  lightBeige: '#F2DFB6',
  dustyRose: '#D5ACA9',
  terracotta: '#C4816A',
  isabelline: '#F9F3F0',
  mutedTeal: '#6EA1A5',
  darkGrey: '#333333',

  // Nuove tonalità per un tema scuro più ricco e corretto
  almostBlack: '#1B1B1D', // Uno sfondo profondo, non nero puro, per ridurre l'affaticamento visivo.
  midGrey: '#4A4A4A',     // Un grigio intermedio per bordi o elementi disattivati.
  lightGrey: '#B0B0B0',   // Un grigio chiaro e neutro per testo secondario, più leggibile del beige su sfondo scuro.
  darkTeal: '#375052'     // Una versione più scura del teal per sfondi di elementi come le "bolle".
};

export const colors = {
  // 🎨 TEMA CHIARO (Invariato)
  light: {
    // Sfondi
    background: palette.offWhite,      // Sfondo principale, molto chiaro e pulito
    card: '#FFFFFF',                   // Usiamo il bianco puro per le card per un contrasto maggiore

    // Testi
    text: palette.darkGrey,            // Testo principale, per la massima leggibilità
    textSecondary: palette.darkGrey,  // Testo secondario o per etichette

    // Elementi Interattivi e Accenti
    primary: palette.terracotta,       // Colore principale per pulsanti e highlight
    accent: palette.dustyRose,         // Un colore di accento secondario

    secondary: palette.isabelline,

    // Altri
    border: '#EAEAEA',                 // Un bordo molto leggero per separare le card
    bubblebg: palette.lightBeige,      // Sfondo per elementi in evidenza come "bolle" o badge
    disabled: palette.dustyRose,       // Colore per gli elementi disattivati
    white: '#FFFFFF',                  // Colore esplicito per testi su sfondi colorati
  },

  // 🌙 TEMA SCURO (Rivisto per maggiore contrasto e profondità)
  dark: {
    // Sfondi con una gerarchia chiara
    background: palette.almostBlack,   // Sfondo principale molto scuro per far risaltare i contenuti
    card: palette.darkGrey,            // Le card sono di un grigio scuro, più chiare dello sfondo per creare profondità

    // Testi ottimizzati per la leggibilità al buio
    text: palette.offWhite,            // Testo principale ad alto contrasto per una facile lettura
    textSecondary: palette.lightGrey,  // Un grigio più chiaro e neutro per il testo secondario, garantisce leggibilità senza affaticare

    // Elementi Interattivi e Accenti che risaltano
    primary: palette.terracotta,       // Il terracotta risalta magnificamente sullo sfondo scuro
    accent: palette.mutedTeal,         // Il teal offre un accento freddo e ben bilanciato

    secondary: palette.terracotta,

    // Altri
    border: palette.midGrey,           // Un bordo visibile ma non invadente per separare le card
    bubblebg: palette.darkTeal,        // Sfondo per "bolle" o badge, coerente con la palette
    disabled: palette.midGrey,         // Colore per elementi disabilitati, con contrasto sufficiente per essere identificabile
    white: '#FFFFFF',                  // Bianco puro, utile per testi su bottoni o sfondi colorati
  },
};
