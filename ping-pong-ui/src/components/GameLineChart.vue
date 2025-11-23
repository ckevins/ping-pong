<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend } from 'chart.js'
import { computed, ref } from 'vue';
import type { GameRecord } from '../types/game';

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)

const props = defineProps<{
  game: GameRecord
}>();

const playerOneDataPoints = computed((): number[] => {
  return props.game.points.map(point => point.playerOneScore);
})

const playerTwoDataPoints = computed((): number[] => {
  return props.game.points.map(point => point.playerTwoScore);
})

const labels = computed((): string[] => {
  return ['Game Start', ...props.game.points.map((_, index) => 'P. ' + (index + 1))];
})

const chartData = computed(() => {
  return {
    labels: labels.value,
    datasets: [
      { 
        label: props.game.playerOne.name,
        backgroundColor: '#f87979',
        borderColor: '#f87979',
        data: [0, ...playerOneDataPoints.value]
      }, 
      { 
        label: props.game.playerTwo.name,
        backgroundColor: '#78EFFF',
        borderColor: '#78EFFF',
        data: [0, ...playerTwoDataPoints.value]
      }
    ]
  }
});
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      // max: 21,
      ticks: {
        type: 'linear',
        stepSize: 1,
        color: 'white'
      }
    },
    x: {
      ticks: {
        color: 'white'
      },
      grid: {
        display: false
      }
    }
  }
};
</script>

<style scoped>
</style>