<template>
  <main>
    <section v-if="onSplashScreen">
      <button 
        @click="beginSetup()"
        @keyup.enter="beginSetup()"
        >
        New Game
      </button>
    </section>
    <section v-if="inSetupMode">
      <GameSetup @init-game="initGame" />
    </section>
    <JumboTron v-if="newGameData" :new-game-data="newGameData" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { JumboTron, GameSetup } from "../components";
import type { initGameData } from "../types/genericTypes";
import type { GameRecord } from "../types/game";
import { Game } from "../types/game";

const onSplashScreen = ref<boolean>(true);
const inSetupMode = ref<boolean>(false);

const newGameData = ref<GameRecord>();

function beginSetup () {
  onSplashScreen.value = false;
  inSetupMode.value = true;
}

function initGame (payload: initGameData) {
  console.log('Creating Game...');
  newGameData.value = new Game(payload.playerOne, payload.playerTwo);
  inSetupMode.value = false;
}

function handleKeyPress (event: any) {
  if (event.key === 'Enter' && onSplashScreen.value) {
    beginSetup();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
})

</script>