<template>
  <div class="player-side">
    <PlayerScore
      class="player-score"
      :player="props.player"
      :score="props.score" 
      :is-final-score="true" 
    />
    <div class="pie-chart-container">
      <PieChart />
    </div>
    <div class="pie-chart-container">
      <PieChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlayerScore, PieChart } from '.';
import type { Player } from '../types/player';

const props = withDefaults(defineProps<{
  player: Player;
  score?: number;
}>(), {
  score: 0
});
</script>

<style scoped>
.player-side {
  display: grid;
  place-items: center;
  margin: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 150px;
  margin-bottom: 20px;
}

.player-score {
  width: 200%;
  grid-column: 1 / span 2;
  text-align: center;
}

.pie-chart-container {
  max-width: 150px;
}
</style>