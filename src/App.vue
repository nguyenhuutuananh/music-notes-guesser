<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useLanguage } from './composables/useLanguage'
import { translations } from './i18n/translations'

interface Note {
  name: string
  position: number
}

// Language composable
const { currentLanguage, toggleLanguage } = useLanguage()

// Computed translations
const t = computed(() => translations[currentLanguage.value])

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
  { name: 'G', position: -37.5 } // Above staff - Sol
]

const currentNote = ref<Note | null>(null)
const correctCount = ref(0)
const incorrectCount = ref(0)
const feedbackMessage = ref('')
const feedbackClass = ref('')

const newNote = () => {
  // Pick a random note
  const randomIndex = Math.floor(Math.random() * notes.length)
  currentNote.value = notes[randomIndex]!

  // Clear feedback
  feedbackMessage.value = ''
  feedbackClass.value = ''
}

const checkAnswer = (guess: string) => {
  if (!currentNote.value) return

  if (guess === currentNote.value.name) {
    feedbackMessage.value = t.value.correct
    feedbackClass.value = 'correct'
    correctCount.value++

    // Auto-generate new note after a short delay
    setTimeout(() => newNote(), 1000)
  } else {
    feedbackMessage.value = `${t.value.incorrect} ${t.value.wrongAnswer} ${currentNote.value.name}`
    feedbackClass.value = 'incorrect'
    incorrectCount.value++
  }
}

onMounted(() => {
  // Start with a random note
  newNote()
})
</script>

<template>
  <div class="bg-white p-10 pt-[60px] rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-center max-w-[600px] mx-auto relative">
    <!-- Language Toggle Button -->
    <button
      class="absolute top-5 right-5 px-4 py-2 text-sm font-bold border-2 border-[#667eea] rounded-lg cursor-pointer bg-white text-[#667eea] transition-all duration-300 whitespace-nowrap z-10 hover:bg-[#667eea] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(102,126,234,0.3)] active:translate-y-0"
      @click="toggleLanguage"
      :title="currentLanguage === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'"
    >
      {{ currentLanguage === 'en' ? '🇻🇳 VI' : '🇬🇧 EN' }}
    </button>

    <!-- Title -->
    <h1 class="text-[#333] m-0 mb-[30px] text-center text-3xl font-bold">{{ t.title }}</h1>

    <!-- Staff Container -->
    <div class="my-24 relative z-0">
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
    <div class="flex justify-center gap-2 flex-wrap my-5 relative z-10">
      <button
        @click="checkAnswer('C')"
        class="px-5 py-3 text-lg font-bold bg-[#667eea] text-white border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0"
      >
        C<br /><small class="text-xs">{{ t.notes.C }}</small>
      </button>
      <button
        @click="checkAnswer('D')"
        class="px-5 py-3 text-lg font-bold bg-[#667eea] text-white border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0"
      >
        D<br /><small class="text-xs">{{ t.notes.D }}</small>
      </button>
      <button
        @click="checkAnswer('E')"
        class="px-5 py-3 text-lg font-bold bg-[#667eea] text-white border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0"
      >
        E<br /><small class="text-xs">{{ t.notes.E }}</small>
      </button>
      <button
        @click="checkAnswer('F')"
        class="px-5 py-3 text-lg font-bold bg-[#667eea] text-white border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0"
      >
        F<br /><small class="text-xs">{{ t.notes.F }}</small>
      </button>
      <button
        @click="checkAnswer('G')"
        class="px-5 py-3 text-lg font-bold bg-[#667eea] text-white border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0"
      >
        G<br /><small class="text-xs">{{ t.notes.G }}</small>
      </button>
      <button
        @click="checkAnswer('A')"
        class="px-5 py-3 text-lg font-bold bg-[#667eea] text-white border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0"
      >
        A<br /><small class="text-xs">{{ t.notes.A }}</small>
      </button>
      <button
        @click="checkAnswer('B')"
        class="px-5 py-3 text-lg font-bold bg-[#667eea] text-white border-none rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#764ba2] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(102,126,234,0.4)] active:translate-y-0"
      >
        B<br /><small class="text-xs">{{ t.notes.B }}</small>
      </button>
    </div>

    <!-- Feedback Message -->
    <div
      class="min-h-[30px] text-xl font-bold my-5 transition-all duration-300"
      :class="{
        'text-[#28a745] scale-110': feedbackClass === 'correct',
        'text-[#dc3545] animate-shake': feedbackClass === 'incorrect'
      }"
    >
      {{ feedbackMessage }}
    </div>

    <!-- New Note Button -->
    <button
      class="px-8 py-3 text-base font-bold bg-[#f8f9fa] text-[#333] border-2 border-[#dee2e6] rounded-lg cursor-pointer transition-all duration-300 mb-5 hover:bg-[#e9ecef] hover:border-[#adb5bd] active:translate-y-0.5"
      @click="newNote"
    >
      {{ t.newNote }}
    </button>

    <!-- Score -->
    <div class="text-lg text-[#666]">
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
  width: 400px;
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
}

.note {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  /* font-size: 60px; */
  color: #333;
}

.note-head {
  font-size: 50px;
}

/* Shake animation for incorrect answers */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .staff {
    width: 300px;
    height: 120px;
  }

  .clef {
    font-size: 275px;
  }

  .note {
    font-size: 55px;
  }

  .note-head {
    font-size: 40px;
  }
}
</style>
