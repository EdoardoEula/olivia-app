/**
 * Questo file definisce la palette di colori dell'applicazione,
 * basata sulla palette "Olivia".
 * Contiene le definizioni sia per il tema chiaro (light) che per quello scuro (dark).
 */

// Definiamo i colori base della palette per un facile accesso
const palette = {
  offWhite: '#F2F7F7',
  lightBeige: '#F2DFB6',
  dustyRose: '#D5ACA9',
  terracotta: '#C4816A',
  mutedTeal: '#6EA1A5',
  darkGrey: '#333333',
};

export const colors = {
  // 🎨 TEMA CHIARO
  light: {
    // Sfondi
    background: palette.offWhite,      // Sfondo principale, molto chiaro e pulito
    card: '#FFFFFF',                   // Usiamo il bianco puro per le card per un contrasto maggiore, come nell'app iOS
    
    // Testi
    text: palette.darkGrey,            // Testo principale, per la massima leggibilità
    textSecondary: palette.mutedTeal,  // Testo secondario o per etichette, usa un colore più morbido
    
    // Elementi Interattivi e Accenti
    primary: palette.terracotta,       // Colore principale per pulsanti e highlight
    accent: palette.dustyRose,         // Un colore di accento secondario
    
    // Altri
    border: '#EAEAEA',                 // Un bordo molto leggero per separare le card
    disabled: palette.dustyRose,       // Colore per gli elementi disattivati
    white: '#FFFFFF',                  // Colore esplicito per testi su sfondi colorati
  },

  // 🌙 TEMA SCURO
  dark: {
    // Sfondi
    background: palette.darkGrey,      // Lo sfondo principale diventa il colore più scuro
    card: '#404040',                   // Un grigio leggermente più chiaro per far "emergere" le card
    
    // Testi
    text: palette.offWhite,            // Testo principale chiaro per contrastare con lo sfondo scuro
    textSecondary: palette.lightBeige, // Il beige chiaro funziona benissimo come testo secondario
    
    // Elementi Interattivi e Accenti
    primary: palette.terracotta,       // Il terracotta risalta magnificamente sul tema scuro
    accent: palette.mutedTeal,         // Il verde acqua diventa un ottimo accento secondario
    
    // Altri
    border: '#555555',                 // Un bordo visibile per separare le card sullo sfondo scuro
    disabled: '#505050',               // Colore scuro e desaturato per gli elementi disattivati
    white: '#FFFFFF',                  // Colore esplicito per testi su sfondi colorati
  },
};