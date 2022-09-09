<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="app">
    <!-- <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav> -->
    <RouterView />
  </div>
</template>

<style scoped>
body, #app {
  background-color: rgb(38, 38, 38);
  min-height: 100vh;
}

#app {
  width: 100%;
  margin: auto;
  padding: 100px;
  color: white;
}
</style>
