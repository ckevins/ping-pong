import { type playerId } from "./genericTypes";
import { type Point } from "./point";
import { type Player } from "./player";

type GameRecord = {
  playerOne: Player;
  playerTwo: Player;
  winner: playerId | undefined;
  loser: playerId | undefined;
  finalWinningScore: number | undefined;
  finalLosingScore: number | undefined;
  points: Point[];
  numberOfTies?: number
}

class Game implements GameRecord {
  playerOne: Player;
  playerTwo: Player;
  winner: playerId | undefined;
  loser: playerId | undefined;
  finalWinningScore: number | undefined;
  finalLosingScore: number | undefined;
  points: Point[];

  constructor(playerOne: Player, playerTwo: Player) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo
    this.points = [];
  }
}

export type { GameRecord };
export { Game };