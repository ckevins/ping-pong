import type { Player } from "./player";

type playerId = number;
type initGameData = {
  playerOne: Player,
  playerTwo: Player
}

export type { playerId, initGameData };
