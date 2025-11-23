<template>
  <main>
    <div v-if="onSplashScreen">
      <button 
        @click="beginSetup()"
        @keyup.enter="beginSetup()"
        >
        New Game
      </button>
    </div>
    <div v-else-if="inSetupMode">
      <GameSetup @init-game="initGame"/>
    </div>
    <div v-else-if="game" class="text-center">
      <p>Point {{ currentPoint.pointNumber }}</p>
      <div class="flex justify-around">
        <PlayerScore
        :player="game.playerOne.name"
        :score="currentScore?.playerOneScore || 0"
        :is-serving="currentPoint.servingPlayer === 1"
        @update-score="updateScore(game.playerOne)"
        />
        <DividerLine height="auto" width="4px" color="white" />
        <PlayerScore
        :player="game.playerTwo.name"
        :score="currentScore?.playerTwoScore || 0"
        :is-serving="currentPoint.servingPlayer === 2"
        @update-score="updateScore(game.playerTwo)"
        />
      </div>
      <button id="undo" class="mt-5" @click="undoUpdateScore()">
        <UndoIcon />
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { GameSetup, PlayerScore, DividerLine } from ".";
import UndoIcon from "./UndoIcon.vue";
import type { Player } from "../types/player";
import type { GameRecord } from "../types/game";
import { Game } from "../types/game";
import type { initGameData } from "../types/genericTypes";
import type { Point } from "../types/point";

const inSetupMode = ref<boolean>(false);
const onSplashScreen = computed((): boolean => {
  return !game.value && !inSetupMode.value;
});

const game = ref<GameRecord | null>();

const numberOfPointsPlayed = computed((): number => {
  const points = game.value?.points;
  return points?.length || 0;
})

// Note that the currentScore will point to the previous point played
const currentScore = computed((): Point | undefined => {
  const points = game.value?.points;
  if (!points || numberOfPointsPlayed.value === 0) return undefined;
  return points[numberOfPointsPlayed.value - 1];
})

const currentPoint = computed((): Point => {
  const playerOneId = game.value?.playerOne.id || -1;
  const playerTwoId = game.value?.playerTwo.id || -1;
  return {
    servingPlayer: Math.floor(numberOfPointsPlayed.value / 5) % 2 == 0 ? playerOneId : playerTwoId,
    pointWinner: -1,
    pointNumber: numberOfPointsPlayed.value + 1,
    playerOneScore: -1,
    playerTwoScore: -1,
  }
})

function updateScore (pointWinner: Player) {
  if (!game.value) return;

  const pointToAdd: Point = {
    ...currentPoint.value,
    pointWinner: pointWinner.id,
    playerOneScore: (currentScore.value?.playerOneScore || 0) + (pointWinner.id === game.value.playerOne.id ? 1 : 0),
    playerTwoScore: (currentScore.value?.playerTwoScore || 0) + (pointWinner.id === game.value.playerTwo.id ? 1 : 0)
  };

  game.value.points.push(pointToAdd);
}

function undoUpdateScore () {
  if(!game.value) return;
  game.value.points.pop();
}

function beginSetup () {
  console.log('Beginning Setup...');
  inSetupMode.value = true;
}

function initGame (payload: initGameData) {
  console.log('Creating Game...');
  game.value = new Game(payload.playerOne, payload.playerTwo);
  inSetupMode.value = false;
}

function handleKeyPress (event: any) {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleEnterKeyPress();
  }
}

function handleEnterKeyPress () {
  console.log('Enter Key Pressed...');
  if (onSplashScreen.value) beginSetup();
}

onMounted(() => {
  // Attach the event listener to the global window object
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  // Remove the event listener when the component is unmounted
  window.removeEventListener('keydown', handleKeyPress);
})

// simple no-op handler referenced from the template
const noop = () => {
  /* intentionally empty */
};
</script>

<style>
#undo:hover {
  cursor: pointer;
  color: rgb(13, 76, 178);
}
</style>
