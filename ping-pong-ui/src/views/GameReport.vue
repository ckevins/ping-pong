<template>
  <div class="view" v-if="gameData">
    <header>
      <h1>Game Report</h1>
    </header>
    <main>
      <div id="score-section">
        <GameReportPlayerSide :player="gameData.playerOne" :score="gameData?.points?.slice(-1)[0]?.playerOneScore ?? 0" />
        <Divider layout="vertical"><b>VS</b></Divider>
        <GameReportPlayerSide :player="gameData.playerTwo" :score="gameData?.points?.slice(-1)[0]?.playerTwoScore ?? 0" />
      </div>
      <Divider />
      <section id="game-details">
        <div id="line-chart-container">
          <GameLineChart v-if="gameData" :game="gameData" />
        </div>
        <Divider layout="vertical" />
        <div id="game-details__right">
          <div>
            <p>First Serve:</p>
            <p>{{ gameData.playerOne.name }}</p>
          </div>
          <div>
            <p>Ties:</p>
            <p>{{ gameData.numberOfTies }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { GameLineChart, PlayerScore, PieChart, GameReportPlayerSide } from '../components';
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
header {
  margin: 20px;
}

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
  display: grid;
  grid-template-columns: 1fr 10px 1fr;
  text-align: center;
  font-family: "Doto";
  min-height: 30vh;
}

#game-details {
  display: flex;
  height: 35vh;
}

#game-details__right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#line-chart-container {
  min-width: 40%;
  flex-grow: 1;
}

.p-divider :deep(.p-divider-content) {
    background-color: rgb(0, 3, 29);
}
</style>