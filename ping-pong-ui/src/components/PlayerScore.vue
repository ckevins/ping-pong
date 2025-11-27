<template>
  <div class="text-center jumbo-tron__half">
    <section class="player-name-section">
      <p id="player-name">{{ props.player.name }}
        <span class="win-loss-record">({{ props.player.wins || 0 }} - {{ props.player.losses || 0 }})</span>
      </p>
      <div :class="props.playerPosition === 1 ? 'serving-indicator player-one' : 'serving-indicator player-two'">
        <PaddleIcon :class="props.isServing && !props.isFinalScore ? '' : 'invisible'" />
        <p :class="props.hasAdvantage ? '' : 'invisible'" id="advantage">Adv.</p>
      </div>
    </section>
    <div>
      <p id="jumbo-tron__score">{{ props.score }}</p>
    </div>
    <div :class="props.isFinalScore ? 'invisible' : ''" role="button" class="jumbo-tron__button" @click="emit('update-score')">+</div>
  </div>
</template>

<script setup lang="ts">
import type { Player } from "../types/player";
import PaddleIcon from './PaddleIcon.vue';

const props = withDefaults(defineProps<{
  player: Player;
  score?: number;
  isServing?: boolean;
  isFinalScore?: boolean;
  hasAdvantage?: boolean;
  playerPosition?: number;
}>(), {
  score: 0,
  isServing: false,
  isFinalScore: false,
  hasAdvantage: false,
  playerPosition: 1,
});

const emit = defineEmits(["update-score"]);
</script>

<style scoped>
.jumbo-tron__half {
  flex-grow: 1;
  max-width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.player-name-section {
  position: relative;
  width: 100%;
}

.win-loss-record {
  font-size: 20px;
  padding-left: 5px;
}

#player-name {
  font-size: 30px;
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

#jumbo-tron__score {
  font-size: 120px;
  font-weight: bolder;
}

.jumbo-tron__button {
  width: 40px;
  font-size: 40px;
}

.jumbo-tron__button:hover {
  color: rgb(13, 76, 178);
}

.invisible {
  opacity: 0;
}

#advantage {
  color: green;
  font-weight: bolder;
}
</style>
