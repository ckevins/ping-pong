<template>
  <main id="home-view">
    <section id="splash" v-if="onSplashScreen">
      <Button id="new-game-button" @click="beginSetup()" @keyup.enter="beginSetup()" label="New Game" />
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
import Button from "primevue/button";

const onSplashScreen = ref<boolean>(true);
const inSetupMode = ref<boolean>(false);

const newGameData = ref<GameRecord>();

function beginSetup() {
  onSplashScreen.value = false;
  inSetupMode.value = true;
}

function initGame(payload: initGameData) {
  console.log('Creating Game...');
  newGameData.value = new Game(payload.playerOne, payload.playerTwo);
  inSetupMode.value = false;
}

function handleKeyPress(event: any) {
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

<style scoped>
#home-view {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

#splash {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#new-game-button {
  font-family: "Doto";
  font-size: 80px;
  color: rgb(85, 255, 85);
  background-color: rgb(6, 6, 31);
  transition: filter 1s ease;
  padding: 20px 40px;
}

#new-game-button:hover {
  filter: brightness(2);
}
</style>