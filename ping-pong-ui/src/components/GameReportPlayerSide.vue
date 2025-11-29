<template>
  <div class="player-side">
    <PlayerScore
      class="player-score"
      :player="props.player"
      :score="props.score" 
      :is-final-score="true" 
      :hide-score-button="true"
    />
    <div class="pie-chart-container">
      <p class="custom-chart-label">Serves: {{ props.player.numberOfServes }}</p>
      <PieChart 
        :chart-data="[props.player.numberOfServesWon, props.player.numberOfServes - props.player.numberOfServesWon]" 
        :chart-labels="['Won', 'Lost']" 
      />
    </div>
    <div class="pie-chart-container">
      <p class="custom-chart-label">Lead Possession</p>
      <PieChart 
        :chart-data="leadPossessionChartData"
        :chart-labels="['Lead', 'Tied', 'Losing']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { PlayerScore, PieChart } from '.';
import type { Player } from '../types/player';
import type { Point } from '../types/point';

type GameReportPlayer = Player & {
  numberOfServes: number
  numberOfServesWon: number
}

const props = withDefaults(defineProps<{
  player: GameReportPlayer;
  score?: number;
  pointData: Point[];
  playerPosition: 1 | 2;
}>(), {
  score: 0
});

const leadPossessionChartData = computed(() => {
  if (props.playerPosition === 1) {
    return [
      props.pointData.filter(x => x.playerOneScore > x.playerTwoScore).length,
      props.pointData.filter(x => x.playerOneScore === x.playerTwoScore).length,
      props.pointData.filter(x => x.playerOneScore < x.playerTwoScore).length
    ]
  } else if (props.playerPosition === 2) {
    return [
      props.pointData.filter(x => x.playerOneScore < x.playerTwoScore).length,
      props.pointData.filter(x => x.playerOneScore === x.playerTwoScore).length,
      props.pointData.filter(x => x.playerOneScore > x.playerTwoScore).length
    ]
  }
})
</script>

<style scoped>
.player-side {
  display: grid;
  place-items: center;
  margin: 20px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
  position: relative
}

.player-score {
  width: 200%;
  grid-column: 1 / span 2;
  text-align: center;
}

.custom-chart-label {
  padding-bottom: 10px;
}
</style>