<template>
  <div class="text-center player-score">
    <section class="player-name-section">
      <p id="player-name">{{ props.player.name }}
        <span class="win-loss-record">({{ props.player.wins }} - {{ props.player.losses }})</span>
      </p>
      <div :class="playerPosition === 1 ? 'serving-indicator player-one' : 'serving-indicator player-two'">
        <PaddleIcon :class="props.isServing && !props.isFinalScore ? '' : 'invisible'" />
        <p :class="hasAdvantage ? '' : 'invisible'" id="advantage">Adv.</p>
      </div>
    </section>
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
  hasAdvantage: boolean;
  playerPosition: number;
}>();

const emit = defineEmits(["update-score"]);
</script>

<style scoped>
.player-score {
  flex-grow: 1;
  max-width: 48%;
}

.player-name-section {
  position: relative;
}

.win-loss-record {
  font-size: 1rem;
  padding-left: 5px;
}

#player-name {
  font-size: 2rem;
}

.serving-indicator {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 5rem;
}

.player-one {
  right: 0;
}

.player-two {
  left: 0;
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

#advantage {
  color: green;
  font-weight: bolder;
}
</style>
