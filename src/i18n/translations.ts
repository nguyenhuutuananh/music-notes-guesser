export interface Translations {
  title: string;
  newNote: string;
  correct: string;
  incorrect: string;
  wrongAnswer: string;
  scoreCorrect: string;
  scoreIncorrect: string;
  trebleClef: string;
  bassClef: string;
  selectNote: string;
  notes: {
    C: string;
    D: string;
    E: string;
    F: string;
    G: string;
    A: string;
    B: string;
  };
}

export const translations: Record<'en' | 'vi', Translations> = {
  en: {
    title: '🎵 Music Notes Guesser',
    newNote: 'New Note',
    correct: '✓ Correct!',
    incorrect: '✗ Wrong!',
    wrongAnswer: 'It was',
    scoreCorrect: 'Correct',
    scoreIncorrect: 'Incorrect',
    trebleClef: 'Treble',
    bassClef: 'Bass',
    selectNote: 'Select a note',
    notes: {
      C: 'C',
      D: 'D',
      E: 'E',
      F: 'F',
      G: 'G',
      A: 'A',
      B: 'B',
    },
  },
  vi: {
    title: '🎵 Đoán Nốt Nhạc',
    newNote: 'Nốt Mới',
    correct: '✓ Đúng rồi!',
    incorrect: '✗ Sai rồi!',
    wrongAnswer: 'Đáp án là',
    scoreCorrect: 'Đúng',
    scoreIncorrect: 'Sai',
    trebleClef: 'Khóa Sol',
    bassClef: 'Khóa Fa',
    selectNote: 'Chọn một nốt nhạc',
    notes: {
      C: 'Đô',
      D: 'Rê',
      E: 'Mi',
      F: 'Fa',
      G: 'Sol',
      A: 'La',
      B: 'Si',
    },
  },
};
