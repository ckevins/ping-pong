<template>
  <div class="text-center">
    <p id="player-name">{{ props.player }}</p>
    <div class="serving-indicator">
      <PaddleIcon v-if="props.isServing" />
    </div>
    <div>
      <div id="jumbo-tron">{{ props.score }}</div>
    </div>
    <button id="jumbo-tron-button" @click="emit('update-score')">+</button>
  </div>
</template>

<script setup>
import PaddleIcon from './PaddleIcon.vue';

const props = defineProps({
  player: String,
  score: Number,
  isServing: Boolean,
});

const emit = defineEmits(["update-score"]);
</script>

<style scoped>
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
