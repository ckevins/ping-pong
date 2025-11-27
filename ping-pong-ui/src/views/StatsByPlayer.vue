
<template>
  <main>
    <h1>Players</h1>
    <div class="card">
      <DataTable 
        stripedRows 
        :value="playerData"
        paginator 
        :rows="10" 
        :rowsPerPageOptions="[10, 20, 50]"
        removableSort
        :globalFilterFields="['name']"
        :filters="filters" 
        @rowClick="handleRowClick"
        scrollable 
        scrollHeight="70vh" 
        sortField="winningPct"
        :sortOrder="-1"
        >
        <template #header>
          <div class="flex justify-between">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Search" />
            </IconField>
          </div>
        </template>
        
        <Column field="name" header="Name" sortable></Column>
        <Column field="wins" header="Wins" sortable></Column>
        <Column field="losses" header="Losses" sortable></Column>
        <Column field="winningPct" header="Winning %" sortable>
          <template #body="{ data }">
              {{ data.winningPct || data.winningPct === 0 ? formatPercentage(data.winningPct) : '-' }}
          </template>
        </Column>
        <Column field="gamesPlayed" header="GP" sortable>
          <template #body="{ data }">
              {{ data.gamesPlayed || '-' }}
          </template>
        </Column>
        <Column field="pointsPlayed" header="Points Played" sortable>
          <template #body="{ data }">
              {{ data.pointsPlayed || '-' }}
          </template>
        </Column>
        <Column field="pointsWon" header="Points Won" sortable>
          <template #body="{ data }">
              {{ data.pointsWon || '-' }}
          </template>
        </Column>
        <Column field="pointWinPct" header="Point Win %" sortable>
          <template #body="{ data }">
            {{ data.pointWinPct || data.pointWinPct === 0 ? formatPercentage(data.pointWinPct) : '-' }}
          </template>
        </Column>
      </DataTable>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { FilterMatchMode } from '@primevue/core/api';
import type { Player } from "../types/player";
import { usePingPongStore } from '../stores/ping-pong';
import { storeToRefs } from 'pinia'

const store = usePingPongStore();
const { useTestUsers } = storeToRefs(store)
const { fetchPlayers } = store;

const playerData = ref<Player[]>([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

function handleRowClick (event: { data: {}; }) {
  console.log('ROW CLICKED', event.data);
}

function formatPercentage (number: number) {
  return number.toFixed(3);
}

onMounted(async () => {
  playerData.value = await fetchPlayers(useTestUsers.value);
});

watch(useTestUsers, async () => {
  playerData.value = await fetchPlayers(useTestUsers.value);
})
</script>

<style>


</style>