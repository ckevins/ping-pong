<template>
  <main id="home-view">
    <section id="splash" v-if="onSplashScreen">
      <TheticsButton 
        id="new-game-button"
        text="New Game"
        size="jumbo"
        @click="beginSetup()"
        @keyup.enter="beginSetup()"
      />
    </section>
    <section v-if="inSetupMode">
      <GameSetup @init-game="initGame" />
    </section>
    <JumboTron v-if="newGameData" :new-game-data="newGameData" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { JumboTron, GameSetup, TheticsButton } from "../components";
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
}

</style>