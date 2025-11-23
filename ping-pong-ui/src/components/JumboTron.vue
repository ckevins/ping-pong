<template>
  <section class="jumbo-tron text-center">
    <div :class="isFinalScore ? 'hide-element' : ''">Point {{ currentPoint.pointNumber }}</div>
    <div class="score-section">
      <PlayerScore
      :class="getPlayerScoreClass(game.playerOne)"
      :player="game.playerOne"
      :score="currentScore?.playerOneScore || 0"
      :is-serving="currentPoint.servingPlayer === 1"
      :is-final-score="isFinalScore"
      :has-advantage="hasAdvantage(game.playerOne)"
      :player-position="1"
      @update-score="updateScore(game.playerOne)"
      />
      <div class="divider-section">
        <DividerLine height="100%" width="4px" :color="isDeuce ? 'orange' : 'white'" />
        <div v-if="isDeuce" class="deuce deuce-text-container">
          <p class="deuce-text" id="deuce-text-1">Deuce!</p>
          <p class="deuce-text" id="deuce-text-2">Deuce!</p>
        </div>
      </div>
      <PlayerScore
      :class="getPlayerScoreClass(game.playerTwo)"
      :player="game.playerTwo"
      :score="currentScore?.playerTwoScore || 0"
      :is-serving="currentPoint.servingPlayer === 2"
      :is-final-score="isFinalScore"
      :has-advantage="hasAdvantage(game.playerTwo)"
      :player-position="2"
      @update-score="updateScore(game.playerTwo)"
      />
    </div>
    <button id="undo" @click="undoUpdateScore()">
      <UndoIcon />
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { PlayerScore, DividerLine } from ".";
import UndoIcon from "./UndoIcon.vue";
import type { Player } from "../types/player";
import type { GameRecord } from "../types/game";
import type { Point } from "../types/point";
import type { playerId } from "../types/genericTypes";

const props = defineProps<{
  newGameData: GameRecord;
}>();

const game = ref<GameRecord>(props.newGameData);

const numberOfPointsPlayed = computed((): number => {
  return game.value.points.length;
})

// Note that the currentScore will point to the previous point played
const currentScore = computed((): Point | undefined => {
  return game.value.points[numberOfPointsPlayed.value - 1];
})

const currentPoint = computed((): Point => {
  const valueTbd = -1;
  return {
    servingPlayer: getServingPlayer(),
    pointNumber: numberOfPointsPlayed.value + 1,
    pointWinner: valueTbd,
    playerOneScore: valueTbd,
    playerTwoScore: valueTbd,
  }
})

function getServingPlayer (): playerId {
  if (isDeuce.value) {
    // when it is deuce, switch server every 2 points
    return Math.floor(numberOfPointsPlayed.value / 2) % 2 == 0 ? game.value.playerOne.id : game.value.playerTwo.id;
  }

  // otherwise swith server every 5 points
  return Math.floor(numberOfPointsPlayed.value / 5) % 2 == 0 ? game.value.playerOne.id : game.value.playerTwo.id;

}

const isDeuce = computed((): boolean => {
  if (!currentScore.value || isFinalScore.value) return false;
  return currentScore.value.playerOneScore >= 20 && currentScore.value.playerTwoScore >= 20;
});

function hasAdvantage (player: Player): boolean {
  if (
    !isDeuce.value 
    || !currentScore.value 
    || currentScore.value?.playerOneScore === currentScore.value?.playerTwoScore
  ) return false;
  const { leadPlayer } = getLeadScore(currentScore.value);
  return leadPlayer.id === player.id;
}

function updateScore (pointWinner: Player) {
  if (isFinalScore.value) return;

  const pointToAdd: Point = {
    ...currentPoint.value,
    pointWinner: pointWinner.id,
    playerOneScore: (currentScore.value?.playerOneScore || 0) + (pointWinner.id === game.value.playerOne.id ? 1 : 0),
    playerTwoScore: (currentScore.value?.playerTwoScore || 0) + (pointWinner.id === game.value.playerTwo.id ? 1 : 0)
  };

  game.value.points.push(pointToAdd);
}

function undoUpdateScore () {
  undoUpdateWinnerInGameRecord();
  game.value.points.pop();
}

function getLeadScore (currentScore: Point) {
  const leadScore: number = Math.max(currentScore.playerOneScore, currentScore.playerTwoScore);
  const leadPlayer = currentScore.playerOneScore === leadScore ? game.value.playerOne : game.value.playerTwo;
  return { leadScore, leadPlayer }
}

function getTrailingScore (currentScore: Point) {
  const trailingScore = Math.min(currentScore.playerOneScore, currentScore.playerTwoScore);
  const trailingPlayer = currentScore.playerOneScore === trailingScore ? game.value!.playerOne : game.value!.playerTwo;
  return { trailingScore, trailingPlayer }
}

function updateWinnerInGameRecord (currentScore: Point) {
  const { leadScore, leadPlayer } = getLeadScore(currentScore);
  const { trailingScore, trailingPlayer }= getTrailingScore(currentScore);

  game.value = {
    ...game.value,
    winner: leadPlayer.id,
    loser: trailingPlayer.id,
    finalWinningScore: leadScore,
    finalLosingScore: trailingScore
  }
}

function undoUpdateWinnerInGameRecord () {
  game.value = {
    ...game.value,
    winner: undefined,
    loser: undefined,
    finalWinningScore: undefined,
    finalLosingScore: undefined
  }
}

const isFinalScore = computed((): boolean => {
  if (!currentScore.value) return false;

  const { leadScore } = getLeadScore(currentScore.value);
  const { trailingScore }= getTrailingScore(currentScore.value);
  
  if (leadScore >= 21 && leadScore - trailingScore >= 2) return true;
  return false;
})

watch(isFinalScore, (newValue) => {
  if (newValue === true) {
    updateWinnerInGameRecord(currentScore.value!);
  }
})

function getPlayerScoreClass (player: Player): string {
  if (isDeuce.value) return'deuce';
  if (isFinalScore.value && game.value.winner === player.id) return 'winner'
  if (isFinalScore.value && game.value.winner !== player.id) return 'loser';
  return ''
}

function handleKeyPress (event: any) {
  switch (event.key) {
    case 'ArrowLeft':
      updateScore(game.value.playerOne);
      break;
    case 'ArrowRight':
      updateScore(game.value.playerTwo);
      break;
    case 'Backspace':
      undoUpdateScore();
      break;
    case '`':
      undoUpdateWinnerInGameRecord();
      game.value.points = [];
      break;
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
.score-section {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 400px;
}

.divider-section {
  position: relative;
  height: 100%;
}

#undo {
  margin-top: 5px;
}

#undo:hover {
  cursor: pointer;
  color: rgb(13, 76, 178);
}

.deuce {
  color: orange;
}

.deuce-text-container {
  width: 50px;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
}

.deuce-text {
  position: absolute;
  top: 50%;
  left: 50%;
  padding-bottom: 30px;
}

#deuce-text-1 {
  transform: translate(-50%, -50%) rotate(90deg);
}

#deuce-text-2 {
  transform: translate(-50%, -50%) rotate(270deg);
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
