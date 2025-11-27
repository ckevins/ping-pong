import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePingPongStore = defineStore('ping-pong', () => {
  const useTestUsers = ref(true)

  const fetchPlayers = async (useTestUsers: boolean) => {
    try {
      let response;
      if (useTestUsers) {
        response = await fetch('/api/test-players');
      } else {
        response = await fetch('/api/players');
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  }
  return { useTestUsers, fetchPlayers }
})