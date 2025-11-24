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

const playersFromApi = ref<Player[]>([]);

const initGameData = ref<initGameData>();

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
    const response = await fetch('/api/players');
    const { data } = await response.json();
    playersFromApi.value = data;
    initGameData.value = {
      playerOne: data.find((x: { name: string; }) => x.name === 'Cody'),
      playerTwo: data.find((x: { name: string; }) => x.name === 'Minnie')
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
})

</script>