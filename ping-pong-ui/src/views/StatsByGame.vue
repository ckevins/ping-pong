
<template>
  <main>
    <h1>Game Records</h1>
    <div class="card">
      <DataTable 
        stripedRows 
        :value="gameData"
        paginator 
        :rows="10" 
        :rowsPerPageOptions="[10, 20, 50]"
        removableSort
        :globalFilterFields="['winner', 'loser']"
        :filters="filters" 
        @rowClick="handleRowClick"
        scrollable 
        scrollHeight="70vh" 
        sortField="gameId"
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
        
        <Column field="gameId" header="Game #" sortable style="width: 8rem"></Column>
        <Column field="date" header="Game Time" sortable style="width: 12rem">
          <template #body="{ data }">
              {{ formatDate(data.date) }}
          </template>
        </Column>
        <Column field="winner" header="Winner" sortable></Column>
        <Column field="loser" header="Loser" sortable></Column>
        <Column field="finalWinningScore" header="Final Score">
          <template #body="{ data }">
              {{ data.finalWinningScore }} - {{ data.finalLosingScore }}
          </template>
        </Column>
      </DataTable>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { type GameRecord } from "../types/game";
import { FilterMatchMode } from '@primevue/core/api';
import { useRouter } from "vue-router";

const router = useRouter();
const gameData = ref<GameRecord[]>([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

function handleRowClick (event: { data: { gameId: any; }; }) {
  console.log('ROW SELECTED', event.data.gameId);
  router.push({ name: 'Game Report', params: { id: event.data.gameId } });
}

function formatDate (value: string) {
  const formatter = new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
  });
  const utcDate = new Date(value);
  return formatter.format(utcDate);

}

onMounted(async () => {
  try {
    const response = await fetch('/api/games');
    const { data } = await response.json();
    gameData.value = data.gameData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<style>


</style>