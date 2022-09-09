<template>
  <div class="text-center">
    <div id="player-name" class="flex items-center">
      <span>
        {{ props.player }}
      </span>
      <svg
        :class="props.isServing ? '' : 'invisible'"
        style="width: 5rem; height: 5rem; margin: auto"
        viewBox="0 0 24 24"
      >
        <path
          fill="white"
          d="M18.5,14C19.9,14 21,15.1 21,16.5C21,17.9 19.9,19 18.5,19C17.1,19 16,17.9 16,16.5C16,15.1 17.1,14 18.5,14M7,15C7,15 8,16 8,17V20.5C8,21.3 8.7,22 9.5,22C10.3,22 11,21.3 11,20.5V17C11,16 12,15 12,15H7M8,14H11C11,14 16,14 16,9C16,4 12,2 9.5,2C7,2 3,4 3,9C3,14 8,14 8,14Z"
        />
      </svg>
    </div>
    <div>
      <div id="jumbo-tron">{{ props.score }}</div>
    </div>
    <button id="jumbo-tron-button" @click="emit('update-score')">+</button>
  </div>
</template>

<script setup>
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
