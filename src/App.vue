<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useLanguage } from './composables/useLanguage';
import { translations } from './i18n/translations';

interface Note {
  name: string;
  position: number;
}

type ClefType = 'treble' | 'bass';

// Language composable
const { currentLanguage, toggleLanguage } = useLanguage();

// Computed translations
const t = computed(() => translations[currentLanguage.value]);

// Current clef type
const currentClef = ref<ClefType>('treble');

// Treble clef notes with their positions (percentage from top of staff)
// Staff lines: 0% = top (F5), 25% = D5, 50% = B4, 75% = G4, 100% = bottom (E4)
const trebleNotes: Note[] = [
  // Notes below the staff (need ledger lines)
  { name: 'C', position: 125 }, // Ledger line below - Middle C (C4)
  { name: 'D', position: 112.5 }, // Space below staff - D4
  // Notes on the staff
  { name: 'E', position: 100 }, // Bottom line (1st) - E4
  { name: 'F', position: 87.5 }, // Space - F4
  { name: 'G', position: 75 }, // 2nd line - G4
  { name: 'A', position: 62.5 }, // Space - A4
  { name: 'B', position: 50 }, // Middle line (3rd) - B4
  { name: 'C', position: 37.5 }, // Space - C5
  { name: 'D', position: 25 }, // 4th line - D5
  { name: 'E', position: 12.5 }, // Space - E5
  { name: 'F', position: 0 }, // Top line (5th) - F5
  // Notes above the staff (need ledger lines)
  { name: 'G', position: -12.5 }, // Space above - G5
  { name: 'A', position: -25 }, // Ledger line above - A5
];

// Bass clef notes with their positions (percentage from top of staff)
// Staff lines: 0% = top (A3), 25% = F3, 50% = D3, 75% = B2, 100% = bottom (G2)
const bassNotes: Note[] = [
  // Notes below the staff (need ledger lines)
  { name: 'E', position: 125 }, // Ledger line below - E2
  { name: 'F', position: 112.5 }, // Space below staff - F2
  // Notes on the staff
  { name: 'G', position: 100 }, // Bottom line (1st) - G2
  { name: 'A', position: 87.5 }, // Space - A2
  { name: 'B', position: 75 }, // 2nd line - B2
  { name: 'C', position: 62.5 }, // Space - C3
  { name: 'D', position: 50 }, // Middle line (3rd) - D3
  { name: 'E', position: 37.5 }, // Space - E3
  { name: 'F', position: 25 }, // 4th line - F3
  { name: 'G', position: 12.5 }, // Space - G3
  { name: 'A', position: 0 }, // Top line (5th) - A3
  // Notes above the staff (need ledger lines)
  { name: 'B', position: -12.5 }, // Space above - B3
  { name: 'C', position: -25 }, // Ledger line above - Middle C (C4)
];

// Get current notes based on clef type
const notes = computed(() => currentClef.value === 'treble' ? trebleNotes : bassNotes);

// Clef symbol based on current clef type
const clefSymbol = computed(() => currentClef.value === 'treble' ? '𝄞' : '𝄢');

const currentNote = ref<Note | null>(null);
const correctCount = ref(0);
const incorrectCount = ref(0);
const feedbackMessage = ref('');
const feedbackClass = ref('');
const isProcessing = ref(false); // Track if buttons should be disabled

// Note names for button rendering
const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;

// Compute ledger lines needed for the current note (scalable for any note range)
const ledgerLines = computed(() => {
  if (!currentNote.value) return [];
  const { position } = currentNote.value;
  const lines: number[] = [];

  // Add ledger lines above the staff (for notes like A5, C6, etc.)
  for (let p = -25; p >= position; p -= 25) {
    lines.push(p);
  }

  // Add ledger lines below the staff
  if (position >= 112.5) {
    // Add ledger lines for notes on lines (C4, A3, etc.)
    for (let p = 125; p <= position; p += 25) {
      lines.push(p);
    }
    // Special case for D4 (112.5) which is in a space but needs the Middle C ledger line
    if (position === 112.5) {
      lines.push(125);
    }
  }

  return lines;
});

const newNote = () => {
  // Pick a random note from the current clef's notes
  const currentNotes = notes.value;
  const randomIndex = Math.floor(Math.random() * currentNotes.length);
  currentNote.value = currentNotes[randomIndex]!;

  // Clear feedback
  feedbackMessage.value = '';
  feedbackClass.value = '';

  // Re-enable buttons when new note is generated
  isProcessing.value = false;
};

const setClef = (clef: ClefType) => {
  if (currentClef.value !== clef) {
    currentClef.value = clef;
    newNote(); // Generate a new note for the new clef
  }
};

const checkAnswer = (guess: string) => {
  const translatedCurrentNote =
    t.value.notes[currentNote.value!.name as keyof typeof t.value.notes];
  // Prevent multiple clicks while processing
  if (!currentNote.value || isProcessing.value) return;

  // Disable buttons immediately
  isProcessing.value = true;

  if (guess === currentNote.value.name) {
    feedbackMessage.value = t.value.correct;
    feedbackClass.value = 'correct';
    correctCount.value++;

    // Auto-generate new note after a short delay
    setTimeout(() => newNote(), 1000);
  } else {
    feedbackMessage.value = `${t.value.incorrect} ${t.value.wrongAnswer} ${translatedCurrentNote !== currentNote.value.name ? translatedCurrentNote + '(' + currentNote.value.name + ')' : currentNote.value.name}`;
    feedbackClass.value = 'incorrect';
    incorrectCount.value++;

    // Re-enable buttons after feedback animation completes
    setTimeout(() => {
      isProcessing.value = false;
    }, 1000);
  }
};

onMounted(() => {
  // Start with a random note
  newNote();
});
</script>

<template>
  <div
    class="bg-white p-4 sm:p-6 md:p-10 pt-[50px] sm:pt-[60px] rounded-[12px] sm:rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-center max-w-[95vw] sm:max-w-[500px] md:max-w-[600px] mx-auto relative"
  >
    <!-- Language Toggle Button -->
    <button
      class="absolute top-3 right-3 sm:top-5 sm:right-5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold border-2 border-[#667eea] rounded-lg cursor-pointer bg-white text-[#667eea] transition-all duration-300 whitespace-nowrap z-10 hover:bg-[#667eea] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(102,126,234,0.3)] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:ring-offset-2"
      @click="toggleLanguage"
      :title="currentLanguage === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'"
      :aria-label="currentLanguage === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'"
    >
      {{ currentLanguage === 'en' ? '🇻🇳 VI' : '🇬🇧 EN' }}
    </button>

    <!-- Title -->
    <h1 class="text-[#333] m-0 mb-4 sm:mb-6 md:mb-[30px] text-center text-xl sm:text-2xl md:text-3xl font-bold">{{ t.title }}</h1>

    <!-- Clef Toggle -->
    <div class="flex justify-center gap-2 mb-4 sm:mb-6" role="group" aria-label="Clef selection">
      <button
        @click="setClef('treble')"
        :aria-pressed="currentClef === 'treble'"
        :aria-label="`${t.trebleClef} clef`"
        class="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-[#764ba2] focus:ring-offset-2"
        :class="currentClef === 'treble' 
          ? 'bg-[#667eea] text-white border-[#667eea]' 
          : 'bg-white text-[#667eea] border-[#667eea] hover:bg-[#667eea] hover:text-white'"
      >
        𝄞 {{ t.trebleClef }}
      </button>
      <button
        @click="setClef('bass')"
        :aria-pressed="currentClef === 'bass'"
        :aria-label="`${t.bassClef} clef`"
        class="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-[#764ba2] focus:ring-offset-2"
        :class="currentClef === 'bass' 
          ? 'bg-[#667eea] text-white border-[#667eea]' 
          : 'bg-white text-[#667eea] border-[#667eea] hover:bg-[#667eea] hover:text-white'"
      >
        𝄢 {{ t.bassClef }}
      </button>
    </div>

    <!-- Staff Container -->
    <div 
      class="my-12 sm:my-16 md:my-24 relative z-0"
      role="img"
      :aria-label="`Musical staff showing a note. ${currentClef === 'treble' ? 'Treble' : 'Bass'} clef.`"
    >
      <div class="staff">
        <div class="clef" :class="currentClef === 'bass' ? 'bass-clef' : ''" aria-hidden="true">{{ clefSymbol }}</div>
        <!-- Main staff lines -->
        <div class="staff-line" style="top: 0" aria-hidden="true"></div>
        <div class="staff-line" style="top: 25%" aria-hidden="true"></div>
        <div class="staff-line" style="top: 50%" aria-hidden="true"></div>
        <div class="staff-line" style="top: 75%" aria-hidden="true"></div>
        <div class="staff-line" style="top: 100%" aria-hidden="true"></div>
        <!-- Ledger lines for notes above/below staff -->
        <div 
          v-for="line in ledgerLines" 
          :key="line" 
          class="ledger-line" 
          :style="{ top: line + '%' }"
          aria-hidden="true"
        ></div>
        <!-- Note head (CSS ellipse, no character) -->
        <div class="note" :style="{ top: currentNote ? currentNote.position + '%' : '50%' }">
          <span class="note-head" aria-hidden="true"></span>
        </div>
      </div>
    </div>

    <!-- Note Buttons -->
    <div 
      class="flex justify-center gap-1.5 sm:gap-2 flex-wrap my-3 sm:my-5 relative z-10"
      role="group"
      :aria-label="t.selectNote || 'Select a note'"
    >
      <button
        v-for="note in noteNames"
        :key="note"
        @click="checkAnswer(note)"
        :disabled="isProcessing"
        :aria-label="`${note} - ${t.notes[note]}`"
        :aria-pressed="false"
        class="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg font-bold bg-[#667eea] text-white border-none rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#764ba2] focus:ring-offset-2"
        :class="
          isProcessing
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0'
        "
      >
        {{ note }}<br /><small class="text-[10px] sm:text-xs">{{ t.notes[note] }}</small>
      </button>
    </div>

    <!-- Feedback Message (aria-live for screen readers) -->
    <div
      class="min-h-[24px] sm:min-h-[30px] text-base sm:text-lg md:text-xl font-bold my-3 sm:my-4 md:my-5 transition-all duration-300"
      :class="{
        'text-[#28a745] scale-110': feedbackClass === 'correct',
        'text-[#dc3545] animate-shake': feedbackClass === 'incorrect',
      }"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ feedbackMessage }}
    </div>

    <!-- New Note Button -->
    <button
      @click="newNote"
      :disabled="isProcessing"
      :aria-label="t.newNote"
      class="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-bold bg-[#f8f9fa] text-[#333] border-2 border-[#dee2e6] rounded-lg transition-all duration-300 mb-3 sm:mb-4 md:mb-5 focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:ring-offset-2"
      :class="
        isProcessing
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer hover:bg-[#e9ecef] hover:border-[#adb5bd] active:translate-y-0.5'
      "
    >
      {{ t.newNote }}
    </button>

    <!-- Score -->
    <div 
      class="text-sm sm:text-base md:text-lg text-[#666]"
      role="status"
      :aria-label="`${t.scoreCorrect}: ${correctCount}, ${t.scoreIncorrect}: ${incorrectCount}`"
    >
      <p class="m-0">
        {{ t.scoreCorrect }}: <span class="font-bold text-[#28a745]">{{ correctCount }}</span> |
        {{ t.scoreIncorrect }}: <span class="font-bold text-[#dc3545]">{{ incorrectCount }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Musical Staff Styles - Custom components that can't be easily replicated with Tailwind */

.staff {
  position: relative;
  height: 160px;
  margin: 40px auto;
  width: min(400px, 90vw);
  max-width: 100%;
}

.staff-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: #333;
  left: 0;
}

.clef {
  position: absolute;
  left: 0px;
  top: 42%;
  transform: translateY(-50%);
  font-size: 361px;
  color: #333;
  line-height: 1;
}

.clef.bass-clef {
  font-size: 140px;
  top: 28%;
  left: 5px;
}

.note {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1;
}

.note-head {
  display: block;
  width: 38px;
  height: 28px;
  background: #333;
  border-radius: 50%;
  transform: rotate(-20deg);
}

.ledger-line {
  position: absolute;
  width: 60px;
  height: 2px;
  background: #333;
  left: 50%;
  transform: translateX(-50%);
}

/* Shake animation for incorrect answers */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

.animate-shake {
  animation: shake 0.5s;
}

/* Responsive adjustments for mobile devices (< 640px) */
@media (max-width: 639px) {
  .staff {
    width: min(280px, 85vw);
    height: 112px;
    margin: 30px auto;
  }

  .clef {
    font-size: 252px;
    left: -2px;
  }

  .clef.bass-clef {
    font-size: 98px;
    top: 28%;
    left: 3px;
  }

  .note-head {
    width: 26px;
    height: 20px;
  }

  .ledger-line {
    width: 42px;
  }
}

/* Responsive adjustments for small tablets (640px - 767px) */
@media (min-width: 640px) and (max-width: 767px) {
  .staff {
    width: min(340px, 88vw);
    height: 136px;
    margin: 35px auto;
  }

  .clef {
    font-size: 306px;
  }

  .clef.bass-clef {
    font-size: 119px;
    top: 28%;
    left: 4px;
  }

  .note-head {
    width: 32px;
    height: 24px;
  }

  .ledger-line {
    width: 50px;
  }
}

/* Responsive adjustments for tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .staff {
    width: min(380px, 90vw);
    height: 152px;
    margin: 38px auto;
  }

  .clef {
    font-size: 342px;
  }

  .clef.bass-clef {
    font-size: 133px;
    top: 28%;
    left: 4px;
  }

  .note-head {
    width: 35px;
    height: 26px;
  }

  .ledger-line {
    width: 55px;
  }
}

/* Ensure proper scaling on very small screens */
@media (max-width: 374px) {
  .staff {
    width: min(240px, 80vw);
    height: 96px;
    margin: 25px auto;
  }

  .clef {
    font-size: 216px;
    left: -3px;
  }

  .clef.bass-clef {
    font-size: 84px;
    top: 28%;
    left: 2px;
  }

  .note-head {
    width: 22px;
    height: 17px;
  }

  .ledger-line {
    width: 36px;
  }
}
</style>
