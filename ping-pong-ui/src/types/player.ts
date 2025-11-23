import { type playerId } from "./genericTypes";

export type Player = {
  id: playerId;
  name: string;
  wins: number;
  losses: number;
}
