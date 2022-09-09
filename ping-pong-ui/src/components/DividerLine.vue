<template>
  <div
    :style="`height: ${props.height}; width: ${props.width}; background-color: ${props.color}`"
  ></div>
</template>

<script setup>
const props = defineProps({
  height: String,
  width: String,
  color: String,
});
</script>
