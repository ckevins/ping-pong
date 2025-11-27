<template>
  <main id="play-game-view">
    <GameSetup v-if="inSetupMode" @init-game="initGame" />
    <JumboTron v-if="newGameData" :new-game-data="newGameData" />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { JumboTron, GameSetup } from "../components";
import type { initGameData } from "../types/genericTypes";
import type { GameRecord } from "../types/game";
import { Game } from "../types/game";

const inSetupMode = ref<boolean>(true);

const newGameData = ref<GameRecord>();

function initGame(payload: initGameData) {
  console.log('Creating Game...');
  newGameData.value = new Game(payload.playerOne, payload.playerTwo);
  inSetupMode.value = false;
}

</script>

<style scoped>
#play-game-view {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>