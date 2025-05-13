<template>
    <!-- Grid container -->
    <section id="grid" :class="`${showGridLines ? '' : 'bg-gray-200 dark:bg-gray-700'} grid mb-4 cursor-pointer`"
        :style="`grid-template-columns: repeat(${gridSize}, minmax(0, 1fr))`" @mousedown="markCell" @mouseup="markCellUp"
        @mouseover="markCellOver"
       >
        <!-- Cell -->
        <div v-for="(cell, index) in grid" :key="index"
            :class="`cell ${showGridLines ? 'border-[1px] border-white dark:border-gray-500' : ''} ${determinColor(cell)}`.trim()"
            :id="index.toString()" :style="`width: 100%; height: ${cellSize}px;`" />
    </section>
</template>

<script setup lang="ts">
import { useGameEngine } from "@/composables";
// == composable(s) ==
const {
    // properties
    grid,
    gridSize,
    cellSize,
    showGridLines,
    palette,
    // methods
    markCell,
    markCellOver,
    markCellUp,
} = useGameEngine();


// functions
const determinColor = (isAlive: boolean) => {
    return isAlive ? (palette.value || 'bg-primary') : 'bg-gray-200 dark:bg-gray-700';
}

</script>
