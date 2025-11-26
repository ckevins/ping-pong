<template>
  <div id="app">
    <Navbar id="nav" />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { Navbar } from "./components";
</script>

<style scoped>
#nav {
  margin: 10px;
}
</style>
