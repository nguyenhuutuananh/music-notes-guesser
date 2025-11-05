import { ref, computed } from 'vue';

export type Language = 'en' | 'vi';

const STORAGE_KEY = 'music-notes-guesser-language';

// Get initial language from localStorage or default to English
const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'vi') {
    return stored;
  }
  return 'vi';
};

// Reactive language state
const currentLanguage = ref<Language>(getInitialLanguage());

export const useLanguage = () => {
  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const toggleLanguage = () => {
    const newLang: Language = currentLanguage.value === 'en' ? 'vi' : 'en';
    setLanguage(newLang);
  };

  return {
    currentLanguage: computed(() => currentLanguage.value),
    setLanguage,
    toggleLanguage,
  };
};
