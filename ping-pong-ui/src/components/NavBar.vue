<template>
  <Menubar :model="items" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();



const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => router.push({ name: 'Home' })
    },
    {
        label: 'Play',
        icon: 'pi pi-play',
        command: () => router.push({ name: 'Play' })
    },
    {
        label: 'Stats',
        icon: 'pi pi-trophy',
        items: [
            {
                label: 'By Game',
                icon: 'pi pi-book',
                command: () => router.push({ name: 'Stats by Game' })
            },
            {
                label: 'By Player',
                icon: 'pi pi-user',
                command: () => router.push({ name: 'Stats by Player' })
            }
        ]
    }
]);
</script>

<style>

</style>