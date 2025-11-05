<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Note {
  name: string
  position: number
}

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
    feedbackMessage.value = '✓ Correct!'
    feedbackClass.value = 'correct'
    correctCount.value++

    // Auto-generate new note after a short delay
    setTimeout(() => newNote(), 1000)
  } else {
    feedbackMessage.value = `✗ Wrong! It was ${currentNote.value.name}`
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
  <div class="container">
    <h1>🎵 Music Notes Guesser</h1>

    <div class="staff-container">
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

    <div class="buttons">
      <button @click="checkAnswer('C')">C<br /><small>Đô</small></button>
      <button @click="checkAnswer('D')">D<br /><small>Rê</small></button>
      <button @click="checkAnswer('E')">E<br /><small>Mi</small></button>
      <button @click="checkAnswer('F')">F<br /><small>Fa</small></button>
      <button @click="checkAnswer('G')">G<br /><small>Sol</small></button>
      <button @click="checkAnswer('A')">A<br /><small>La</small></button>
      <button @click="checkAnswer('B')">B<br /><small>Si</small></button>
    </div>

    <div class="feedback" :class="feedbackClass">{{ feedbackMessage }}</div>

    <button class="new-note-btn" @click="newNote">New Note</button>

    <div class="score">
      <p>Correct: <span>{{ correctCount }}</span> | Incorrect: <span>{{ incorrectCount }}</span></p>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

.staff-container {
  background: white;
  padding: 40px 20px;
  margin: 20px 0;
  border-radius: 10px;
  border: 2px solid #ddd;
}

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
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 80px;
  font-weight: bold;
  color: #333;
}

.note {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 60px;
  color: #333;
}

.note-head {
  font-size: 50px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 20px 0;
}

button {
  padding: 15px 20px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  background: #667eea;
  color: white;
}

button:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

button:active {
  transform: translateY(0);
}

.feedback {
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  min-height: 30px;
}

.correct {
  color: #10b981;
}

.incorrect {
  color: #ef4444;
}

.score {
  margin-top: 20px;
  font-size: 18px;
  color: #666;
}

.new-note-btn {
  margin-top: 20px;
  background: #10b981;
  padding: 15px 40px;
  font-size: 18px;
}

.new-note-btn:hover {
  background: #059669;
}
</style>
