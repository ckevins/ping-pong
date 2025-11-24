<template>
  <div role="button" :class="`css-thetics-btn--${props.size}`">
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string,
  size: 'small'| 'regular'| 'large' | 'jumbo'
}>();
</script>

<style lang="scss">
.css-thetics-btn {
  font-family: "Doto";

  &--jumbo {
    font-size: 80px;
  }
}
</style>