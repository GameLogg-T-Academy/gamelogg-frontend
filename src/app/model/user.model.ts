import { Game } from "./game.model";

export interface User {
    id: number;
    name: string;
    email: string;
    games: Game[];
  }