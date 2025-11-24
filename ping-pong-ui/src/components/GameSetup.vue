<template>
  <section id="player-select-section" >
    <p>{{ playerSelectTip }}</p>
    <div class="player-option" v-for="(player, index) in playersFromApi" :key="index">
      <Checkbox 
        v-model="selectedPlayers"
        name="selectedPlayers"
        :value="player" 
        :inputId="`${player.id}`"
        :disabled="isCheckboxDisabled(player)">
      </Checkbox>
      <label :for="`${player.id}`"> {{ player.name }} ({{ player.wins }}-{{ player.losses }})</label>
    </div>
    <Button id="ping-pong-button" @click="initGame" :label="initGameDisabled ? 'Choose your players' : 'Ping Pong!'" :disabled="initGameDisabled" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { Player } from "../types/player";
import type { initGameData } from "../types/genericTypes";
import Button from "primevue/button";
import Checkbox from 'primevue/checkbox';

const playersFromApi = ref<Player[]>([]);
const selectedPlayers = ref<Player[]>([]);

const playerSelectTip = computed(() => {
  switch (selectedPlayers.value.length) {
    case 0:
      return 'Select player to serve first:';
    case 1:
      return 'Select player to return first:';
    case 2:
      return 'Ready to start!';
  }
  if (selectedPlayers.value.length === 0) return 'Select player to serve first:'
})
const initGameDisabled = computed(() => {
  return selectedPlayers.value.length < 2;
})

const emit = defineEmits(["init-game"]);

function initGame() {
  console.log('Init game...');
  if (initGameDisabled.value) return;

  const initGameData: initGameData = {
    playerOne: selectedPlayers.value[0]!,
    playerTwo: selectedPlayers.value[1]!
  }
  console.log('With players:', initGameData);
  emit('init-game', initGameData);
}

function isCheckboxDisabled (player: Player) {
  if (selectedPlayers.value.map(x => x.id).includes(player.id)) return false;
  if (selectedPlayers.value.length === 2) return true;
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
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
})

</script>

<style scoped>
#player-select-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.player-option {
  display: flex;
  gap: 10px;
}

#ping-pong-button {
  font-family: 'Doto';
  font-size: 20px;
  width: 255px;
}

#ping-pong-button:disabled {
  font-size: 20px;
  background-color: rgb(64, 87, 63);
  border-color: rgb(64, 87, 63);
}
</style>