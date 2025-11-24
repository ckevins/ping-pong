
<template>
  <div 
  role="button" 
  :style="style"
  :class="cssClass"
    >
    {{ props.text }}
    <slot></slot>
  </div>
</template>
    
<script setup lang="ts">
import { computed } from "vue";
interface Props {
  text?: string,
  size?: 'small'| 'regular'| 'large' | 'jumbo',
  color?: string,
  backgroundColor?: string
  borderColor?: string
  variant?: 'round'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'regular',
  color: 'black',
  backgroundColor: 'white',
  borderColor: 'black'
})

const cssClass = computed(() => {
  return `css-thetics-btn css-thetics-btn--${props.size}`;
});

const style = computed(() => {
  return {
    color: props.color, 
    backgroundColor: props.backgroundColor, 
    borderColor: props.borderColor
  }
});
</script>

<style lang="scss">
.css-thetics-btn {
  font-family: "Doto";
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid;
  max-width: max-content;
  transition: filter 0.3s ease; /* Smooth transition */

  &--small {
    font-size: 10px;
  }

  &--regular {
    font-size: 12px;
  }

  &--large {
    font-size: 20px;
  }

  &--jumbo {
    padding: 10px 20px;
    font-size: 80px;
  }

  &--round {
    border-radius: 100%;
  }

  &:hover {
    cursor: pointer;
    filter: brightness(3); /* Darken the color on hover */
  }
}
</style>