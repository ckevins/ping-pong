<template>
  <section>
    <section class="jumbo-tron-container">
      <div :class="isFinalScore ? 'hide-element' : ''">Point {{ currentPoint.pointNumber }}</div>
      <div id="jumbo-tron">
        <PlayerScore :class="getPlayerScoreClass(game.playerOne)" :player="game.playerOne"
          :score="currentScore?.playerOneScore || 0" :is-serving="currentPoint.servingPlayer === game.playerOne.id"
          :is-final-score="isFinalScore" :has-advantage="hasAdvantage(game.playerOne)" :player-position="1"
          @update-score="updateScore(game.playerOne)" />
        <div class="divider-section">
          <DividerLine height="100%" width="4px" :color="getDividerColor()" />
          <div v-if="isDeuce" class="deuce deuce-text-container">
            <p class="deuce-text" id="deuce-text-1">Deuce!</p>
            <p class="deuce-text" id="deuce-text-2">Deuce!</p>
          </div>
        </div>
        <PlayerScore :class="getPlayerScoreClass(game.playerTwo)" :player="game.playerTwo"
          :score="currentScore?.playerTwoScore || 0" :is-serving="currentPoint.servingPlayer === game.playerTwo.id"
          :is-final-score="isFinalScore" :has-advantage="hasAdvantage(game.playerTwo)" :player-position="2"
          @update-score="updateScore(game.playerTwo)" />
        <Button 
          v-if="isFinalScore" 
          id="submit-game-button"
          label="Submit Game"
          color="rgb(85, 255, 85)"
          background-color="rgb(0, 37, 0)"
          border-color="rgb(85, 255, 85)"
          @click="submitGame()"
          >
        </Button>
      </div>
      <Button 
        id="undo-button"
        @click="undoUpdateScore()"
        >
        <UndoIcon />
      </Button>
    </section>
    <section class="chart-container">
      <GameLineChart :game="game" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { PlayerScore, DividerLine, GameLineChart } from ".";
import UndoIcon from "./UndoIcon.vue";
import type { Player } from "../types/player";
import type { GameRecord } from "../types/game";
import type { Point } from "../types/point";
import type { playerId } from "../types/genericTypes";
import Button from "primevue/button";

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

function getServingPlayer(): playerId {
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

function hasAdvantage(player: Player): boolean {
  if (
    !isDeuce.value
    || !currentScore.value
    || currentScore.value?.playerOneScore === currentScore.value?.playerTwoScore
  ) return false;
  const { leadPlayer } = getLeadScore(currentScore.value);
  return leadPlayer.id === player.id;
}

function updateScore(pointWinner: Player) {
  if (isFinalScore.value) return;

  const pointToAdd: Point = {
    ...currentPoint.value,
    pointWinner: pointWinner.id,
    playerOneScore: (currentScore.value?.playerOneScore || 0) + (pointWinner.id === game.value.playerOne.id ? 1 : 0),
    playerTwoScore: (currentScore.value?.playerTwoScore || 0) + (pointWinner.id === game.value.playerTwo.id ? 1 : 0)
  };

  game.value.points.push(pointToAdd);
}

function undoUpdateScore() {
  undoUpdateWinnerInGameRecord();
  game.value.points.pop();
}

function getLeadScore(currentScore: Point) {
  const leadScore: number = Math.max(currentScore.playerOneScore, currentScore.playerTwoScore);
  const leadPlayer = currentScore.playerOneScore === leadScore ? game.value.playerOne : game.value.playerTwo;
  return { leadScore, leadPlayer }
}

function getTrailingScore(currentScore: Point) {
  const trailingScore = Math.min(currentScore.playerOneScore, currentScore.playerTwoScore);
  const trailingPlayer = currentScore.playerOneScore === trailingScore ? game.value!.playerOne : game.value!.playerTwo;
  return { trailingScore, trailingPlayer }
}

function updateWinnerInGameRecord(currentScore: Point) {
  const { leadScore, leadPlayer } = getLeadScore(currentScore);
  const { trailingScore, trailingPlayer } = getTrailingScore(currentScore);

  game.value = {
    ...game.value,
    winner: leadPlayer.id,
    loser: trailingPlayer.id,
    finalWinningScore: leadScore,
    finalLosingScore: trailingScore
  }
}

function undoUpdateWinnerInGameRecord() {
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
  const { trailingScore } = getTrailingScore(currentScore.value);

  if (leadScore >= 21 && leadScore - trailingScore >= 2) return true;
  return false;
})

watch(isFinalScore, (newValue) => {
  if (newValue === true) {
    updateWinnerInGameRecord(currentScore.value!);
  }
})

function getPlayerScoreClass(player: Player): string {
  if (isDeuce.value) return 'deuce';
  if (isFinalScore.value && game.value.winner === player.id) return 'winner'
  if (isFinalScore.value && game.value.winner !== player.id) return 'loser';
  return ''
}

function handleKeyPress(event: any) {
  switch (event.key) {
    case 'ArrowLeft':
    case '[':
      updateScore(game.value.playerOne);
      break;
    case 'ArrowRight':
    case ']':
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

function getDividerColor () {
  if (isDeuce.value) return 'orange';
  if (isFinalScore.value) return 'clear';
  return 'white';
}

async function submitGame () {
  try {
    fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate the content type
      },
      body: JSON.stringify(game.value), // Convert data to JSON string
    })
  } catch (error) {
    console.error('Error fetching data:', error);
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
.jumbo-tron-container, .chart-container {
  text-align: center;
  height: calc(50vh - 20px);
}

.jumbo-tron-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: "Doto";
}

#jumbo-tron {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 280px;
  width: 100%;
}

.divider-section {
  position: relative;
  height: 100%;
}

#undo-button {
  margin-top: 5px;
  color: white;
  background-color: rgba(0,0,0,0);
  border: none;
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
  color: rgb(85, 255, 85);
}

.loser {
  color: rgb(167, 167, 167);
}

.hide-element {
  visibility: hidden;
}

#submit-game-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}

</style>
