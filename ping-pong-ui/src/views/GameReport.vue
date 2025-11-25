<template>
  <div class="view">
    <header v-if="gameData && gameData.points.length > 0">
      <h1>Game Report</h1>
      <div id="score-section">
        <PlayerScore 
        :player="gameData.playerOne"
        :score="gameData?.points?.slice(-1)[0]?.playerOneScore ?? 0" 
        :is-final-score="true" 
        />
        <Divider layout="vertical"><b>VS</b></Divider>
        <PlayerScore 
        :player="gameData.playerTwo"
        :score="gameData?.points?.slice(-1)[0]?.playerTwoScore ?? 0" 
        :is-final-score="true" 
        />
      </div>
    </header>
    <main>
      <section id="chart-container">
        <GameLineChart v-if="gameData" :game="gameData" />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { GameLineChart, PlayerScore } from '../components';
import type { GameRecord } from '../types/game';
import Divider from 'primevue/divider';

const route = useRoute();
const gameId = route.params.id;

const gameData = ref<GameRecord>();

onMounted(async () => {
  try {
    const response = await fetch(`/api/games/${gameId}`);
    const { data } = await response.json();
    gameData.value = {
      ...data.gameData,
      playerOne: data.playerData.find((x: { name: any; }) => x.name === data.gameData.firstServe), // make this better by updating query in backend
      playerTwo: data.playerData.find((x: { name: any; }) => x.name !== data.gameData.firstServe),
      points: data.pointData
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})
</script>

<style scoped lang="scss">
#game-report {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h1,
h2,
h3 {
  text-align: center;
}

#score-section {
  display: flex;
  text-align: center;
  font-family: "Doto";
  flex-grow: 1;
  min-height: 30vh;
}

/* For Vue 3, you might use :deep() instead of ::v-deep */
.p-divider :deep(.p-divider-content) {
    background-color: rgb(0, 3, 29);
}

#chart-container {
  height: 30vh;
}
</style>