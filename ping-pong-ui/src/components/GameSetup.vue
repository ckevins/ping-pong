<template>
  <div>
    <p>
      Player One: {{ playerOne?.name || ''}}
    </p>
    <p>
      Player Two: {{ playerTwo?.name || '' }}
    </p>
    <button @click="initGame">Start Game</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { Player } from "../types/player";
import type { initGameData } from "../types/genericTypes";

const players = ref<Player[]>([
  {
    id: 1,
    name: 'Cody',
    wins: 6,
    losses: 4
  },
  {
    id: 2,
    name: 'Jacob',
    wins: 4,
    losses: 6
  }
]);

const playerOne = ref<Player | undefined>(players.value[0]);
const playerTwo = ref<Player | undefined>(players.value[1]);

const initGameData = ref<initGameData>({
  playerOne: playerOne.value!,
  playerTwo: playerTwo.value!
});

const emit = defineEmits(["init-game"]);

function initGame() {
  console.log('Init game...');
  emit('init-game', initGameData.value);
}

function handleKeyPress (event: any) {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleEnterKeyPress();
  }
}

function handleEnterKeyPress () {
  console.log('Enter Key Pressed...');
  initGame();
}

onMounted(() => {
  // Attach the event listener to the global window object
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  // Remove the event listener when the component is unmounted
  window.removeEventListener('keydown', handleKeyPress);
})

</script>