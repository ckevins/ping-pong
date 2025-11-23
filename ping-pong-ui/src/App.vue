<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>
<style scoped>
body, #app {
  background-color: rgb(0, 3, 29);
  min-height: 100vh;
}

#app {
  width: 100%;
  margin: auto;
  padding: 20px;
  color: white;
}
</style>
