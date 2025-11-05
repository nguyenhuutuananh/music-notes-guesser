<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useLanguage } from './composables/useLanguage';
import { translations } from './i18n/translations';

interface Note {
  name: string;
  position: number;
}

// Language composable
const { currentLanguage, toggleLanguage } = useLanguage();

// Computed translations
const t = computed(() => translations[currentLanguage.value]);

// Treble clef notes with their positions (percentage from top of staff)
const notes: Note[] = [
  { name: 'C', position: 100 }, // Bottom line - Đô
  { name: 'D', position: 87.5 }, // Between lines - Rê
  { name: 'E', position: 75 }, // 4th line - Mi
  { name: 'F', position: 62.5 }, // Between lines - Fa
  { name: 'G', position: 50 }, // 3rd line (middle) - Sol
  { name: 'A', position: 37.5 }, // Between lines - La
  { name: 'B', position: 25 }, // 2nd line - Si
  { name: 'C', position: 12.5 }, // Between lines - Đô
  { name: 'D', position: 0 }, // Top line - Rê
  { name: 'E', position: -12.5 }, // Above staff - Mi
  { name: 'F', position: -25 }, // Above staff - Fa
  { name: 'G', position: -37.5 }, // Above staff - Sol
];

const currentNote = ref<Note | null>(null);
const correctCount = ref(0);
const incorrectCount = ref(0);
const feedbackMessage = ref('');
const feedbackClass = ref('');
const isProcessing = ref(false); // Track if buttons should be disabled

const newNote = () => {
  // Pick a random note
  const randomIndex = Math.floor(Math.random() * notes.length);
  currentNote.value = notes[randomIndex]!;

  // Clear feedback
  feedbackMessage.value = '';
  feedbackClass.value = '';

  // Re-enable buttons when new note is generated
  isProcessing.value = false;
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
      class="absolute top-3 right-3 sm:top-5 sm:right-5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold border-2 border-[#667eea] rounded-lg cursor-pointer bg-white text-[#667eea] transition-all duration-300 whitespace-nowrap z-10 hover:bg-[#667eea] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(102,126,234,0.3)] active:translate-y-0"
      @click="toggleLanguage"
      :title="currentLanguage === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'"
    >
      {{ currentLanguage === 'en' ? '🇻🇳 VI' : '🇬🇧 EN' }}
    </button>

    <!-- Title -->
    <h1 class="text-[#333] m-0 mb-4 sm:mb-6 md:mb-[30px] text-center text-xl sm:text-2xl md:text-3xl font-bold">{{ t.title }}</h1>

    <!-- Staff Container -->
    <div class="my-12 sm:my-16 md:my-24 relative z-0">
      <div class="staff">
        <div class="clef">𝄞</div>
        <div class="staff-line" style="top: 0"></div>
        <div class="staff-line" style="top: 25%"></div>
        <div class="staff-line" style="top: 50%"></div>
        <div class="staff-line" style="top: 75%"></div>
        <div class="staff-line" style="top: 100%"></div>
        <div class="note" :style="{ top: currentNote ? currentNote.position + '%' : '50%' }">
          <span class="note-head">●</span>
        </div>
      </div>
    </div>

    <!-- Note Buttons -->
    <div class="flex justify-center gap-1.5 sm:gap-2 flex-wrap my-3 sm:my-5 relative z-10">
      <button
        @click="checkAnswer('C')"
        :disabled="isProcessing"
        class="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg font-bold bg-[#667eea] text-white border-none rounded-lg transition-all duration-300"
        :class="
          isProcessing
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0'
        "
      >
        C<br /><small class="text-[10px] sm:text-xs">{{ t.notes.C }}</small>
      </button>
      <button
        @click="checkAnswer('D')"
        :disabled="isProcessing"
        class="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg font-bold bg-[#667eea] text-white border-none rounded-lg transition-all duration-300"
        :class="
          isProcessing
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0'
        "
      >
        D<br /><small class="text-[10px] sm:text-xs">{{ t.notes.D }}</small>
      </button>
      <button
        @click="checkAnswer('E')"
        :disabled="isProcessing"
        class="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg font-bold bg-[#667eea] text-white border-none rounded-lg transition-all duration-300"
        :class="
          isProcessing
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0'
        "
      >
        E<br /><small class="text-[10px] sm:text-xs">{{ t.notes.E }}</small>
      </button>
      <button
        @click="checkAnswer('F')"
        :disabled="isProcessing"
        class="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg font-bold bg-[#667eea] text-white border-none rounded-lg transition-all duration-300"
        :class="
          isProcessing
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0'
        "
      >
        F<br /><small class="text-[10px] sm:text-xs">{{ t.notes.F }}</small>
      </button>
      <button
        @click="checkAnswer('G')"
        :disabled="isProcessing"
        class="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg font-bold bg-[#667eea] text-white border-none rounded-lg transition-all duration-300"
        :class="
          isProcessing
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0'
        "
      >
        G<br /><small class="text-[10px] sm:text-xs">{{ t.notes.G }}</small>
      </button>
      <button
        @click="checkAnswer('A')"
        :disabled="isProcessing"
        class="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg font-bold bg-[#667eea] text-white border-none rounded-lg transition-all duration-300"
        :class="
          isProcessing
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0'
        "
      >
        A<br /><small class="text-[10px] sm:text-xs">{{ t.notes.A }}</small>
      </button>
      <button
        @click="checkAnswer('B')"
        :disabled="isProcessing"
        class="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg font-bold bg-[#667eea] text-white border-none rounded-lg transition-all duration-300"
        :class="
          isProcessing
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0'
        "
      >
        B<br /><small class="text-[10px] sm:text-xs">{{ t.notes.B }}</small>
      </button>
    </div>

    <!-- Feedback Message -->
    <div
      class="min-h-[24px] sm:min-h-[30px] text-base sm:text-lg md:text-xl font-bold my-3 sm:my-4 md:my-5 transition-all duration-300"
      :class="{
        'text-[#28a745] scale-110': feedbackClass === 'correct',
        'text-[#dc3545] animate-shake': feedbackClass === 'incorrect',
      }"
    >
      {{ feedbackMessage }}
    </div>

    <!-- New Note Button -->
    <button
      @click="newNote"
      :disabled="isProcessing"
      class="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-bold bg-[#f8f9fa] text-[#333] border-2 border-[#dee2e6] rounded-lg transition-all duration-300 mb-3 sm:mb-4 md:mb-5"
      :class="
        isProcessing
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer hover:bg-[#e9ecef] hover:border-[#adb5bd] active:translate-y-0.5'
      "
    >
      {{ t.newNote }}
    </button>

    <!-- Score -->
    <div class="text-sm sm:text-base md:text-lg text-[#666]">
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

.note {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
  line-height: 1;
}

.note-head {
  font-size: 50px;
  display: inline-block;
  line-height: 1;
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

  .note-head {
    font-size: 35px;
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

  .note-head {
    font-size: 42px;
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

  .note-head {
    font-size: 47px;
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

  .note-head {
    font-size: 30px;
  }
}
</style>
