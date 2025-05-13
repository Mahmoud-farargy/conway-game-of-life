<template>
  <AppLoader v-once />
  <div class="md:bg-gray-100 dark:md:bg-gray-900 min-h-screen select-none transition-colors duration-300">
    <main class="flex flex-col items-center">
      <div class="min-h-screen w-full flex justify-center items-center">
        <div
          class="w-full h-full max-w-3xl xl:max-w-[34rem] 2xl:max-w-xl bg-white dark:bg-gray-800 md:rounded-lg md:shadow-lg dark:shadow-xl p-3 md:p-4 mx-auto transition-colors duration-300">
          <!-- == Game Header == -->
          <GameHeader />
          <!-- == Game Board == -->
          <GameGrid />
          <!-- == Info Panel == -->
          <StatsPanel />
          <!-- == CTRLS == -->
          <GameControls />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { GameControls, GameGrid, StatsPanel, GameHeader, AppLoader } from '@/components';
import { useLocalStorage } from "@/composables";
import { refreshAppLanguageAndTheme } from "@/helpers/tools";

// Composables
const { getItem: getLocalStorage, resetStorage  } = useLocalStorage();

// Lifecycle Hooks
onMounted( async () => { 
  let storedData = await getLocalStorage();
  storedData = Object.keys(storedData || {}).length > 0 ? storedData : resetStorage();
  // reflects the language and theme throughout the app upon its initialization
  refreshAppLanguageAndTheme(storedData?.settings);
});

</script>
