import { type playerId } from "./genericTypes";

export type Player = {
  id: playerId;
  name: string;
  handedness: string;
  wins: number;
  losses: number;
}
