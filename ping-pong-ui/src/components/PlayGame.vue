<template>
  <div class="text-center">
    <div class="flex justify-around">
      <PlayerScore
        :player="state.playerOne"
        :score="state.playerOneCurrentScore"
        :is-serving="serving === state.playerOne"
        @update-score="updateScore(1)"
      />
      <DividerLine height="auto" width="4px" color="white" />
      <PlayerScore
        :player="state.playerTwo"
        :score="state.playerTwoCurrentScore"
        :is-serving="serving === state.playerTwo"
        @update-score="updateScore(2)"
      />
    </div>
    <button id="undo" class="mt-5" @click="undo">
      <svg style="width: 4rem; height: 4rem" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import PlayerScore from "./PlayerScore.vue";
import DividerLine from "./DividerLine.vue";

const state = reactive({
  playerOne: "Player One Name",
  playerTwo: "Player Two Name",
  playerOneCurrentScore: 0,
  playerTwoCurrentScore: 0,
  points: [],
  winningScore: null,
  losingScore: null,
  winner: null,
  loser: null,
  largestDeficit: 0,
});

const pointsPlayed = computed(() => state.points.length);
const preDeucePoint = 38;
const winningPriorToDeuce = computed(() => {
  if (state.points[38]) {
    return state.points[preDeucePoint].playerOneScore >
      state.points[preDeucePoint].playerTwoScore
      ? state.playerOne
      : state.playerTwo;
  }
  return null;
});

const serving = computed(() => {
  if (
    state.playerOneCurrentScore === 20 &&
    state.playerTwoCurrentScore !== 20
  ) {
    return state.playerTwo;
  } else if (
    state.playerTwoCurrentScore === 20 &&
    state.playerOneCurrentScore !== 20
  ) {
    return state.playerOne;
  } else if (pointsPlayed.value === 40) {
    return winningPriorToDeuce.value;
  } else if (Math.floor(pointsPlayed.value / 5) % 2 == 0) {
    return state.playerOne;
  } else {
    return state.playerTwo;
  }
});

function updateScore(player) {
  if (player === 1) {
    recordScore(state.playerOne);
    state.playerOneCurrentScore++;
  } else if (player === 2) {
    recordScore(state.playerTwo);
    state.playerTwoCurrentScore++;
  }
}

function recordScore(pointWinner) {
  state.points.push({
    playerOneScore: state.playerOneCurrentScore,
    playerTwoScore: state.playerTwoCurrentScore,
    serving: serving,
    pointWonBy: pointWinner,
  });
}

function undo() {
  if (state.points.length > 0) {
    state.playerOneCurrentScore =
      state.points[pointsPlayed.value - 1].playerOneScore || 0;
    state.playerTwoCurrentScore =
      state.points[pointsPlayed.value - 1].playerTwoScore || 0;
    state.points.pop();
  }
}
</script>

<style>
#undo:hover {
  cursor: pointer;
  color: rgb(13, 76, 178);
}
</style>
