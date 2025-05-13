<template>
  <!-- Controls -->
  <section class="flex flex-wrap justify-center gap-3 md:gap-4">
    <div v-show="aliveCellsCount > 0" class="flex items-center justify-center flex-wrap gap-3 md:gap-4">
      <label
        class="whitespace-nowrap bg-primary text-white py-1.5 md:py-2 hover:brightness-105 transition-[filter] duration-300 px-4 rounded cursor-pointer">
        <input @change="handleAutoPlaying" id="default-checkbox" type="checkbox" v-model="isGamePlaying"
          class="align-middle">
        <span for="default-checkbox" class="ms-2 text-sm font-medium align-middle">
          {{ $t('autoplay') }}</span>
      </label>
      <button v-show="!isGamePlaying" @click="nextGame"
        type="button" :aria-label="$t('next')"
        class="bg-yellow-500 text-white py-1.5 md:py-2 hover:brightness-105 transition-[filter] duration-300 px-4 rounded cursor-pointer">
         {{ $t('next') }}
      </button>
      <button @click="resetGame"
        type="button" :aria-label="$t('reset')"
        class="bg-emerald-500 text-white py-1.5 md:py-2 hover:brightness-105 transition-[filter] duration-300 px-4 rounded cursor-pointer">
        {{ $t('reset') }}
      </button>
    </div>
    <button @click="randomizeGrid" :disabled="isGamePlaying"
      type="button" :aria-label="$t('randomize') "
      :class="`${isGamePlaying ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer'} bg-cyan-500 text-white py-1.5 md:py-2 hover:brightness-105 transition-[filter] duration-300 px-4 rounded`.trim()">
      {{ $t('randomize') }}
    </button>
  </section>
</template>

<script lang="ts" setup>
import { useGameEngine } from "@/composables";

const {
  aliveCellsCount,
  isGamePlaying,
  resetGame,
  randomizeGrid,
  nextGame,
  handleAutoPlaying
} = useGameEngine();
</script>