import { Ref } from 'vue';

// == Types ==
export type Cell = boolean;
export type GridSettings = {
    language: "en" | "de"
    mode: string
    showGridLines: boolean
    gameSpeed: number
    boardSize: number | string
    palette: string
}
export type GameOfLifeInstance = {
  grid: Ref<Cell[]>
  gridSize: Ref<number>
  generationsCount: Ref<number>
  aliveCellsCount: Ref<number>
  isGamePlaying: Ref<boolean>
  cellSize: Ref<number>
  showGridLines: Ref<boolean>
  gameSpeed: Ref<number>
  palette: Ref<string>
  localStoredBoardSize: Ref<number | string>

  nextGame: () => void
  resetGame: () => number
  stopGame: () => void
  changeGamePlayStatus: (e: boolean) => void
  randomizeGrid: () => number
  handleAutoPlaying: () => void
  markCell: (e: MouseEvent) => void
  markCellOver: (e:  MouseEvent | TouchEvent ) => void
  markCellUp: () => void
  updateGridData: (e: Cell[]) => void
  updateGridSettings: (e: GridSettings) => void
  updateBoardSize: (e: number | string) => void
  trackAliveCells: () => void
};
