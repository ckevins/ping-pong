<template>
  <main>
    <TheticsButton size="small" />
    <TheticsButton size="regular" />
    <TheticsButton size="large" />
    <TheticsButton size="jumbo" />
  </main>
</template>

<script setup lang="ts">
import { TheticsButton } from '../components';
</script>

<style scoped>
main {
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
  padding: 10px;
}
</style>