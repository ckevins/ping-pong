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
import { players } from '../constants/player-list';

const playerOne = ref<Player | undefined>(players[0]);
const playerTwo = ref<Player | undefined>(players[1]);

const initGameData = ref<initGameData>({
  playerOne: playerOne.value!,
  playerTwo: playerTwo.value!
});

const emit = defineEmits(["init-game"]);

function initGame() {
  emit('init-game', initGameData.value);
}

function handleKeyPress (event: any) {
  if (event.key === 'Enter') {
    handleEnterKeyPress();
  }
}

function handleEnterKeyPress () {
  console.log('Enter Key Pressed...');
  initGame();
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
})

</script>