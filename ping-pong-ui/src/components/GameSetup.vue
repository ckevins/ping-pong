<template>
  <section>
    <NewPlayerDialog @player-added="getPlayers" />
    <div v-if="playerData.length > 0" id="player-select-section">
      <p>{{ playerSelectTip }}</p>
      <div class="player-option" v-for="(player, index) in playerData" :key="index">
        <Checkbox v-model="selectedPlayers" name="selectedPlayers" :value="player" :inputId="`${player.id}`"
          :disabled="isCheckboxDisabled(player)">
        </Checkbox>
        <label :for="`${player.id}`"> {{ player.name }} ({{ player.wins }}-{{ player.losses }})</label>
      </div>
      <Button id="ping-pong-button" @click="initGame" :label="initGameDisabled ? 'Choose your players' : 'Ping Pong!'"
        :disabled="initGameDisabled" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import type { Player } from "../types/player";
import type { initGameData } from "../types/genericTypes";
import Button from "primevue/button";
import Checkbox from 'primevue/checkbox';
import { usePingPongStore } from "../stores/ping-pong";
import { storeToRefs } from "pinia";
import { NewPlayerDialog } from ".";

const store = usePingPongStore();
const { useTestUsers } = storeToRefs(store)
const { fetchPlayers } = store;

const playerData = ref<Player[]>([]);
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
  if (initGameDisabled.value) return;

  const initGameData: initGameData = {
    playerOne: selectedPlayers.value[0]!,
    playerTwo: selectedPlayers.value[1]!
  }
  emit('init-game', initGameData);
}

function isCheckboxDisabled(player: Player) {
  if (selectedPlayers.value.map(x => x.id).includes(player.id)) return false;
  if (selectedPlayers.value.length === 2) return true;
}

function handleKeyPress(event: any) {
  if (event.key === 'Enter') {
    handleEnterKeyPress();
  }
}

function handleEnterKeyPress() {
  console.log('Enter Key Pressed...');
  initGame();
}

async function getPlayers() {
  playerData.value = await fetchPlayers(useTestUsers.value);
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeyPress);
  await getPlayers();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
})

watch(useTestUsers, async () => {
  await getPlayers()
})
</script>

<style scoped>
section, #player-select-section {
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