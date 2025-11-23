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
      <div :class="isFinalScore ? 'hide-element' : ''">Point {{ currentPoint.pointNumber }}</div>
      <div class="flex justify-between">
        <PlayerScore
        :class="getPlayerScoreClass(game.playerOne)"
        :player="game.playerOne"
        :score="currentScore?.playerOneScore || 0"
        :is-serving="currentPoint.servingPlayer === 1"
        :is-final-score="isFinalScore"
        @update-score="updateScore(game.playerOne)"
        />
        <DividerLine height="auto" width="4px" color="white" />
        <PlayerScore
        :class="getPlayerScoreClass(game.playerTwo)"
        :player="game.playerTwo"
        :score="currentScore?.playerTwoScore || 0"
        :is-serving="currentPoint.servingPlayer === 2"
        :is-final-score="isFinalScore"
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
  if (!game.value || isFinalScore.value) return;

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

function getLeadScore (currentScore: Point) {
  const leadScore: number = Math.max(currentScore.playerOneScore, currentScore.playerTwoScore);
  const leadPlayer = currentScore.playerOneScore === leadScore ? game.value!.playerOne : game.value!.playerTwo;
  return {
    leadScore,
    leadPlayer
  }
}

function getTrailingScore (currentScore: Point) {
  const trailingScore = Math.min(currentScore.playerOneScore, currentScore.playerTwoScore);
  const trailingPlayer = currentScore.playerOneScore === trailingScore ? game.value!.playerOne : game.value!.playerTwo;
  return {
    trailingScore,
    trailingPlayer
  }
}

function updateWinnerInGameRecord (leadPlayer: Player, leadPlayerScore: number, trailingPlayer: Player, trailingPlayerScore: number) {
  if (!game.value) return;
  game.value = {
    ...game.value,
    winner: leadPlayer.id,
    loser: trailingPlayer.id,
    finalWinningScore: leadPlayerScore,
    finalLosingScore: trailingPlayerScore
  }
}

function undoUpdateWinnerInGameRecord () {
  if (!game.value) return;
    game.value = {
    ...game.value,
    winner: undefined,
    loser: undefined,
    finalWinningScore: undefined,
    finalLosingScore: undefined
  }
}

const isFinalScore = computed((): boolean => {
  if (!game.value || !currentScore.value) return false;
  const { leadScore, leadPlayer } = getLeadScore(currentScore.value);
  const { trailingScore, trailingPlayer }= getTrailingScore(currentScore.value);
  
  if (leadScore < 21) return false;
  if (leadScore >= 21 && leadScore - trailingScore >= 2) {
    updateWinnerInGameRecord(leadPlayer, leadScore, trailingPlayer, trailingScore)
    return true;
  }
  return false;
})

function getPlayerScoreClass (player: Player): string {
  if (!isFinalScore.value || !game.value) return '';
  return game.value.winner === player.id ? 'winner' : 'loser';
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
    if (onSplashScreen.value) beginSetup();
  }

  if (event.key === 'ArrowLeft') {
    if (!game.value) return;
    updateScore(game.value.playerOne);
  }

  if (event.key === 'ArrowRight') {
    if (!game.value) return;
    updateScore(game.value.playerTwo);
  }

  if (event.key === 'Backspace') {
    if (!game.value) return;
    undoUpdateScore();
  }

  if (event.key === '`') {
    if (!game.value) return;
    undoUpdateWinnerInGameRecord();
    game.value.points = [];
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
})
</script>

<style>
#undo:hover {
  cursor: pointer;
  color: rgb(13, 76, 178);
}

.winner {
  color: green;
}

.loser {
  color: gray;
}

.hide-element {
  visibility: hidden;
}
</style>
