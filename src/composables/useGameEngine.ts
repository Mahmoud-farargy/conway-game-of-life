import { useGameOfLife } from './useGameOfLife'
import type { GameOfLifeInstance } from "@/types/Grid";
let instance: GameOfLifeInstance | null = null;

export const useGameEngine = () => {
  if (!instance) { //allows us to access the useGameOfLife instance from any place in our app while only calling it once 
    instance = useGameOfLife();
  }
  return instance;
}
