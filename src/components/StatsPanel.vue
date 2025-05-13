<template>
    <div class="flex justify-center text-base md:text-lg items-center gap-2.5 text-center w-full py-2 md:py-2.5">
        <span class="uppercase">{{ $t('generations') }} <strong class="text-primary">{{ generationsCount
        }}</strong></span>
        <span class="uppercase">{{ $t('alive_cells') }} <strong class="text-primary">{{ aliveCellsCount }}</strong>
        </span>
    </div>
</template>

<script lang="ts" setup>
     import { useGameEngine } from "@/composables";
     const { generationsCount, aliveCellsCount } = useGameEngine();
</script>