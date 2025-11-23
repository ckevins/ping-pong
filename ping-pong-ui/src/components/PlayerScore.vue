<template>
  <div class="text-center player-score">
    <p id="player-name">{{ props.player.name }}<span class="win-loss-record">({{ props.player.wins }} - {{ props.player.losses }})</span></p>
    <div class="serving-indicator">
      <PaddleIcon v-if="props.isServing && !props.isFinalScore" />
    </div>
    <div>
      <div id="jumbo-tron">{{ props.score }}</div>
    </div>
    <button id="jumbo-tron-button" @click="emit('update-score')">+</button>
  </div>
</template>

<script setup lang="ts">
import type { Player } from "../types/player";
import PaddleIcon from './PaddleIcon.vue';

const props = defineProps<{
  player: Player;
  score: number;
  isServing: boolean;
  isFinalScore: boolean;
}>();

const emit = defineEmits(["update-score"]);
</script>

<style scoped>
.player-score {
  flex-grow: 1;
  max-width: 48%;
}

.win-loss-record {
  font-size: 1rem;
  padding-left: 5px;
}

#player-name {
  font-size: 2rem;
}

.serving-indicator {
  min-height: 5rem;
}

#jumbo-tron {
  font-size: 10rem;
}

#jumbo-tron-button {
  font-size: 5rem;
}

.invisible {
  opacity: 0;
}
</style>
