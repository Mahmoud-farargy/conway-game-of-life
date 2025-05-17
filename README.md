# conway-game-of-life

A simple yet powerful implementation of Conway's Game of Life, featuring full responsiveness, interactive grid controls, and a range of customizable options.

## Technologies Used

Built with Vue 3 (Composition API), TypeScript, and Tailwind CSS.

## Features

- Start/Stop (Autoplay)
- Reset
- Randomize
- Next Step
- Statistics: Generation count, live cell count
- Save patterns in localStorage
- Game rules info modal
- Game settings: change game speed, grid cell size, grid line visibility, and cell color
- Translations in English / German
- Dark/Light modes
- Export/Import pattern as JSON

## Instructions

- **Settings**: Click the options button → Settings  
- **Export/Import Grid**: Options → Settings → Export or Import a file  
- **Read Game Rules**: Options → Game Rules

## Button Descriptions

- **Autoplay**: Toggles the self-running mode  
- **Next**: Advances the grid by one generation  
- **Reset**: Clears the grid  
- **Randomize**: Fills the grid with a random pattern of alive and dead cells

## How the Grid Works

1. Creates an empty grid  
2. Allows the user to toggle, draw, or randomize grid cells  
3. Runs the simulation: for each frame, the next state is calculated based on Conway’s rules:  
   - A cell with fewer than 2 or more than 3 neighbors dies  
   - A dead cell with exactly 3 neighbors becomes alive

## Screenshots and demo

![App Screenshot](./src/assets/app-screenshot.png)

![Live Demo](https://lifeonboard.netlify.app)

## Future Improvements / Enhancements

- Remove unnecessary async/await since the 'getLocalStorage' function isn't asynchronous (App: line 32)
- Teleport the App Modal to the body element to avoid z-index and stacking issues (AppModal: line 2)
- Call stopGame() in the onUnmounted hook to properly clean up timers (useGameOfLife: line 243)
- Debounce the 'calcGridSize' function on resize events to optimize performance (useGameOfLife: line 218)

## Setup for Starting the Project Locally

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
