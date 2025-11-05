# Internationalization (i18n)

This document describes the bilingual support implementation in the Music Notes Guesser application.

## Overview

The application supports two languages:
- **English (en)** - Default language
- **Vietnamese (vi)**

The user's language preference is automatically saved to `localStorage` and persists across sessions.

## Architecture

### 1. Language Composable (`src/composables/useLanguage.ts`)

A Vue 3 composable that manages the language state:

```typescript
export const useLanguage = () => {
  const currentLanguage: ComputedRef<Language>
  const setLanguage: (lang: Language) => void
  const toggleLanguage: () => void
}
```

**Features:**
- Reactive language state using Vue's `ref()`
- Automatic persistence to `localStorage`
- Initial language detection from `localStorage` or defaults to English
- Toggle function to switch between languages

**Storage Key:** `music-notes-guesser-language`

### 2. Translations (`src/i18n/translations.ts`)

Centralized translation object containing all UI text:

```typescript
export const translations: Record<'en' | 'vi', Translations>
```

**Translation Structure:**
- `title` - Application title
- `newNote` - New note button text
- `correct` - Correct answer feedback
- `incorrect` - Incorrect answer feedback
- `wrongAnswer` - Wrong answer prefix
- `scoreCorrect` - Correct score label
- `scoreIncorrect` - Incorrect score label
- `notes` - Object containing all note names (C, D, E, F, G, A, B)

### 3. Usage in Components

In `App.vue`:

```vue
<script setup lang="ts">
import { useLanguage } from './composables/useLanguage'
import { translations } from './i18n/translations'

const { currentLanguage, toggleLanguage } = useLanguage()
const t = computed(() => translations[currentLanguage.value])
</script>

<template>
  <h1>{{ t.title }}</h1>
  <button @click="toggleLanguage">
    {{ currentLanguage === 'en' ? '🇻🇳 VI' : '🇬🇧 EN' }}
  </button>
</template>
```

## Adding New Translations

To add new translatable text:

1. **Update the `Translations` interface** in `src/i18n/translations.ts`:
   ```typescript
   export interface Translations {
     // ... existing fields
     newField: string
   }
   ```

2. **Add translations for both languages**:
   ```typescript
   export const translations = {
     en: {
       // ... existing translations
       newField: 'English text'
     },
     vi: {
       // ... existing translations
       newField: 'Văn bản tiếng Việt'
     }
   }
   ```

3. **Use in component**:
   ```vue
   <template>
     <div>{{ t.newField }}</div>
   </template>
   ```

## Adding New Languages

To add support for a new language (e.g., Spanish):

1. **Update the `Language` type** in `src/composables/useLanguage.ts`:
   ```typescript
   export type Language = 'en' | 'vi' | 'es'
   ```

2. **Update the initial language detection** to include the new language:
   ```typescript
   const getInitialLanguage = (): Language => {
     const stored = localStorage.getItem(STORAGE_KEY)
     if (stored === 'en' || stored === 'vi' || stored === 'es') {
       return stored
     }
     return 'en'
   }
   ```

3. **Add translations** in `src/i18n/translations.ts`:
   ```typescript
   export const translations: Record<'en' | 'vi' | 'es', Translations> = {
     en: { /* ... */ },
     vi: { /* ... */ },
     es: {
       title: '🎵 Adivina las Notas Musicales',
       // ... other translations
     }
   }
   ```

4. **Update the language toggle UI** to support multiple languages (consider a dropdown instead of toggle)

## Language Persistence

The language preference is stored in the browser's `localStorage` with the key:
```
music-notes-guesser-language
```

**Behavior:**
- When the user first visits: defaults to English
- When the user changes language: immediately saved to `localStorage`
- On subsequent visits: automatically loads the saved preference
- If `localStorage` is cleared: reverts to English default

## Testing

To test the bilingual feature:

1. **Switch languages**: Click the language toggle button (🇻🇳 VI / 🇬🇧 EN)
2. **Verify UI updates**: All text should change immediately
3. **Check persistence**: Refresh the page and verify the language remains the same
4. **Test localStorage**: 
   - Open browser DevTools → Application → Local Storage
   - Find key `music-notes-guesser-language`
   - Verify value is `'en'` or `'vi'`

## Best Practices

1. **Always use translations**: Never hardcode user-facing text in components
2. **Keep translations synchronized**: Ensure all languages have the same keys
3. **Use TypeScript**: The `Translations` interface ensures type safety
4. **Descriptive keys**: Use clear, descriptive keys for translation strings
5. **Test both languages**: Always test new features in both English and Vietnamese

## Future Enhancements

Potential improvements for the i18n system:

- [ ] Add more languages (Spanish, French, etc.)
- [ ] Implement lazy loading for translation files
- [ ] Add language auto-detection based on browser settings
- [ ] Create a language selector dropdown for 3+ languages
- [ ] Add RTL (Right-to-Left) support for languages like Arabic
- [ ] Implement pluralization support
- [ ] Add date/time formatting per locale

