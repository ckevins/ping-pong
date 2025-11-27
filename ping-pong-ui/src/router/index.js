import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlayGame from "../views/PlayGame.vue";
import StatsByGame from "../views/StatsByGame.vue";
import StatsByPlayer from "../views/StatsByPlayer.vue";
import GameReport from "../views/GameReport.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/play",
      name: "Play",
      component: PlayGame,
    },
    {
      path: "/stats",
      children: [
        {
          path: "/by-game",
          name: "Stats by Game",
          component: StatsByGame,
        },
        {
          path: "/game-report/:id",
          name: "Game Report",
          component: GameReport,
        },
        {
          path: "/by-player",
          name: "Stats by Player",
          component: StatsByPlayer
        }
      ]
    }
  ],
});

export default router;
