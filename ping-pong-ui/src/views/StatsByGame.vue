
<template>
  <main>
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
        
        <Column field="gameId" header="Game #" sortable></Column>
        <Column field="winner" header="Winner" sortable></Column>
        <Column field="loser" header="Loser" sortable></Column>
        <Column field="finalWinningScore" header="Winning Score" sortable></Column>
        <Column field="finalLosingScore" header="Losing Score" sortable></Column>
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