<template>
<main>
  GAME REPORT FOR GAME: {{ gameId }}
</main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params.id);
const gameId = route.params.id;
</script>
<style>

</style>