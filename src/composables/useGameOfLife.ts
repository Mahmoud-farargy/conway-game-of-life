import { onUnmounted, onMounted, ref, nextTick, watch } from 'vue'
import type { Cell, GridSettings } from "@/types/Grid";
import { useLocalStorage } from "./useLocalStorage"
import { debounce } from "@/helpers/tools";

export const useGameOfLife = () => {
  // == Composables ==
  const { setItem: setLocalStorageItem, getItem: getLocalStorage } = useLocalStorage();

  // == Vars ==
  const borderSize = 1;
  const defaultCellSize = (window?.innerWidth < 768 ? 13 : 14);
  const ALIVE = true;
  const EMPTY = false;

  // == Refs ==
  const cellSize = ref<number>(defaultCellSize);
  const gameSpeed = ref<number>(250);
  const gridSize = ref<number>(0);
  const showGridLines = ref<boolean>(true);

  const grid = ref<Cell[]>([]);
  const isMouseDown = ref<boolean>(false);
  const isGamePlaying = ref<boolean>(false);
  const aliveCellsCount = ref<number>(0);
  const generationsCount = ref<number>(0);
  const localStoredBoardSize = ref<number | string>("");
  const palette = ref("");
  const gameInterval = ref<number | null>(null);
  
  // == Functions ==
  const saveGridInLS = debounce(() => nextTick(() => setLocalStorageItem("grid", grid.value)), 400);

  const createAnEmptyGrid = (size: number) => new Array(size * size).fill(EMPTY);

  const getCellIndex = (e: MouseEvent | TouchEvent) => {
    const target = (e.target as HTMLElement).closest('.cell')! as HTMLElement | null;
    if(!target) return -1;
    return +target?.id || -1;
  }

  const toggleCell = (index: number) => { //draws the cell
    if (index < 0 || index >= grid.value.length) return;
    grid.value[index] = grid.value[index] === ALIVE ? EMPTY : ALIVE;
    trackAliveCells();
    saveGridInLS();
  }

  const markCell = (e: MouseEvent): void => {
    const index = getCellIndex(e);
    isMouseDown.value = true;
    toggleCell(index);
  }

  const markCellOver = (e: MouseEvent | TouchEvent) => {
    const index = getCellIndex(e)
    if (isMouseDown.value) {
      toggleCell(index);
    }
  }

  const markCellUp = () => {
    isMouseDown.value = false;
  }

  const trackAliveCells = () => {
    // we avoided using this as a computed property for better performance on a big grid
    const liveCells = grid.value.filter(Boolean)?.length;
    aliveCellsCount.value = liveCells;

    if (liveCells <= 0) {
      stopGame();
      generationsCount.value = 0;
      isGamePlaying.value = false;
    }
    return liveCells
  }

  const calNextGeneration = (): void => {
    const nextGrid = grid.value.map((alive, i) => {
      const neighborsCount = countAliveNeighbors(i);
      if(alive && (neighborsCount < 2 || neighborsCount > 3)){
        return EMPTY;
      }else if(!alive && neighborsCount === 3){
        return ALIVE;
      }
      return alive;
    })
    grid.value = nextGrid;
    generationsCount.value = trackAliveCells() > 0 ? generationsCount.value + 1 : 0;
  }

  const countAliveNeighbors = (index: number): number => {
    const row = Math.floor(index/gridSize.value);
    const col = index % gridSize.value;
    let count = 0;

    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [ 0, -1],          [ 0, 1],
      [ 1, -1], [ 1, 0], [ 1, 1],
    ]

    for (const [dx, dy] of directions) {
      const neighborRow = row + dx
      const neighborCol = col + dy
      if ( neighborRow >= 0 && neighborRow < gridSize.value && neighborCol >= 0 && neighborCol < gridSize.value ) {
        const neighborIndex = neighborRow * gridSize.value + neighborCol;
        if (grid.value[neighborIndex]) {
          count++;
        }
      }
    }

    return count;
  }

  const startGame = () => {
    if (gameInterval.value) return
    gameInterval.value = setInterval(() => {
      calNextGeneration();
    }, gameSpeed.value);
  }

  const stopGame = (): void => {
    if (gameInterval.value) {
      clearInterval(gameInterval.value);
      saveGridInLS();
      gameInterval.value = null;
    }
  }

  const nextGame = (): void => {
    calNextGeneration();
    saveGridInLS();
  }

  const handleAutoPlaying = () => {
    if (isGamePlaying.value) {
      startGame();
    } else {
      stopGame();
    }
  }

  const resetGame = (): number => {
    grid.value = createAnEmptyGrid(gridSize.value);
    isGamePlaying.value = false;
    generationsCount.value = 0;
    stopGame();
    saveGridInLS();
    return trackAliveCells();
  }

  const normalizeGrid = (savedGrid: Cell[], size: number) => {
    if (!Array.isArray(savedGrid)) return [];
    
    const totalCells = size * size;
    if (savedGrid.length === totalCells) {
      return savedGrid;
    }

    const resizedGrid = [...savedGrid];

    if (savedGrid.length > totalCells) {
      return resizedGrid.slice(0, totalCells);
    }

    return resizedGrid.concat(new Array(totalCells - savedGrid.length).fill(EMPTY));
  };

  const calcGridSize = (): void | number => {
    const gridContainer = document.getElementById('grid') as HTMLElement;
    if(gridContainer){
      const size = Math.floor((+localStoredBoardSize.value || gridContainer.clientWidth)/cellSize.value);
      const normalizedGrid = normalizeGrid(grid.value, size);
      const newGrid = normalizedGrid.length > 0 ? normalizedGrid : createAnEmptyGrid(size);
      gridSize.value = size;
      grid.value = newGrid;

      return trackAliveCells();
    }
  }

  const randomizeGrid = (): number => {
    for (let i = 0; i < grid.value.length; i++) {
      grid.value[i] = Math.random() > 0.5 ? ALIVE : EMPTY;
    }
    saveGridInLS();
    return trackAliveCells();
  }

  const updateGridData = (newVal: Cell[]) => grid.value = newVal;

  const changeGamePlayStatus = (newVal: boolean) => isGamePlaying.value = newVal;

  const updateBoardSize = (newVal: number | string) => localStoredBoardSize.value = newVal;

  const updateGridSettings = (newSettingsData: GridSettings) => {
    if(!newSettingsData) return;
    showGridLines.value = newSettingsData.showGridLines;
    const maxStepsValue = 500;
    const eachStepValue = 45;
    gameSpeed.value = maxStepsValue - (newSettingsData.gameSpeed * eachStepValue);
    localStoredBoardSize.value = newSettingsData.boardSize;
    palette.value = newSettingsData.palette;
    cellSize.value = newSettingsData.showGridLines ? (defaultCellSize + borderSize) : defaultCellSize;

    nextTick(() => {
      calcGridSize();
    });
  }

  // == Watchers ==
  watch(localStoredBoardSize,(val) => {
    // responsive
    if(!val){
      window.addEventListener('resize', calcGridSize);
    }else{
      // fixed size
      window.removeEventListener('resize', calcGridSize);
    }
  }, {immediate: true});

  // == Lifecycle Hooks ==
  onMounted(async() => {
    const storedData = await getLocalStorage();
    const { grid: storedGrid = [], settings = {}} = storedData || {};
    // updates necessary properties based on the stored data in localStorage data
    nextTick(() => {
        updateGridData(storedGrid);
        if(Object.keys(settings || {}).length > 0){
          updateGridSettings(settings);
        }else{
          // re-calculates the grid size based on the current screen size
          calcGridSize();
        }
    })
    window.addEventListener('mouseup', markCellUp);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', calcGridSize);
    window.removeEventListener('mouseup', markCellUp)
  })
  

  return {
    // Properties
    grid,
    gridSize,
    generationsCount,
    aliveCellsCount,
    isGamePlaying,
    cellSize,
    showGridLines,
    gameSpeed,
    palette,
    localStoredBoardSize,
    // Methods
    nextGame,
    resetGame,
    stopGame,
    changeGamePlayStatus,
    randomizeGrid,
    handleAutoPlaying,
    markCell,
    markCellOver,
    markCellUp,
    updateGridData,
    updateGridSettings,
    updateBoardSize,
    trackAliveCells,
  }
}
