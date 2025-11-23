import { type playerId } from "./genericTypes";

export type Point = {
  servingPlayer: playerId;
  pointWinner: playerId;
  pointNumber: number;
  playerOneScore: number;
  playerTwoScore: number;
}
