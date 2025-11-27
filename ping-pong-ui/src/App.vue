<template>
  <div id="app">
    <Navbar id="nav" />
    <RouterView />
    <div id="test-user-toggle">
      <p>Use Test Users:</p>
      <ToggleSwitch v-model="useTestUsers" />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { Navbar } from "./components";
import { usePingPongStore } from './stores/ping-pong';
import { storeToRefs } from 'pinia'

const store = usePingPongStore();
const { useTestUsers } = storeToRefs(store)
</script>

<style scoped>
#nav {
  margin: 10px;
}

#test-user-toggle {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
