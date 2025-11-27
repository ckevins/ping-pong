<template>
  <main id="home-view">
    <Button 
      id="new-game-button" 
      @click="playGame()"
      @keyup.enter="playGame()" 
      label="New Game" 
    ></Button>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { JumboTron, GameSetup } from "../components";
import Button from "primevue/button";
import { useRouter } from "vue-router";

const router = useRouter();

function playGame() {
  router.push({ name: 'Play' });
}

function handleKeyPress(event: any) {
  if (event.key === 'Enter') {
    playGame();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
})

</script>

<style scoped>
#home-view {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#splash {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#new-game-button {
  font-family: "Doto";
  font-size: 80px;
  color: rgb(85, 255, 85);
  background-color: rgb(6, 6, 31);
  transition: filter 1s ease;
  padding: 20px 40px;
  max-width: max-content;
}

#new-game-button:hover {
  filter: brightness(2);
}
</style>