<template>
  <div>
    <p v-for="(player, index) in playersFromApi" :key="index">
      {{ player.name }}
      {{ player.handedness }}
    </p>
    <button @click="initGame">Start Game</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { Player } from "../types/player";
import type { initGameData } from "../types/genericTypes";
import { players } from '../constants/player-list';

const playersFromApi = ref<Player[]>([]);

const initGameData = ref<initGameData>({
  playerOne: players[0]!,
  playerTwo: players[1]!
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

onMounted(async () => {
  window.addEventListener('keydown', handleKeyPress);
  try {
    const response = await fetch('/api/data');
    const { data} = await response.json();
    playersFromApi.value = data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
})

</script>