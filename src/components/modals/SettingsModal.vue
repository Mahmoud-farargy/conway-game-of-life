<template>
    <AppModal v-bind="props">
        <div
            class="flex flex-col space-y-4 text-start p-4 md:p-5 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <!-- == Importing/Exporting == -->
            <span class="text-gray-700 dark:text-white font-semibold">{{ $t('exporting') }}</span>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3 w-full items-center">
                <!-- Import File uploader -->
                <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center text-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                        <div class="flex flex-col items-center justify-center p-1.5 md:p-2">
                            <ImportIcon class="w-6 h-6 mb-2 text-gray-500 dark:text-gray-300"/>
                            <p class="mb-1 text-xs text-gray-500 dark:text-gray-300 font-semibold">
                                {{ $t('import_current_grid') }}
                            </p>
                        </div>
                        <input id="dropzone-file" accept=".json" type="file" @change="importGridFromJson" class="hidden" />
                    </label>
                </div>
                <!-- Export Button -->
                <button  
                    @click="exportGridToAJsonFile"
                    class="flex flex-col items-center justify-center h-20 px-4 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 text-gray-500 dark:text-gray-300">
                    <DownloadIcon class="w-6 h-6 mb-2 text-gray-500 dark:text-gray-300" />
                    <span class="text-xs font-semibold">{{ $t('export_current_grid') }}</span>
                </button>
            </div>
            <!-- == Settings Form ==  -->
            <FormDivider :title="$t('general')" :place-in-middle="false" />
            <form @submit.prevent="onSettingsFormSubmission">
                <!-- General Settings -->
                <div class="flex flex-col space-y-4">
                    <!-- Language -->
                    <SelectInput v-model="settingsForm.language" :label="$t('language')"
                        :options="translatedOptions.languages" id="language" :isSeperate="true" />
                    <!-- Dark/Light -->
                    <SelectInput v-model="settingsForm.mode" :label="$t('theme')" :options="translatedOptions.modes"
                        id="mode" :isSeperate="true" />
                </div>
                <FormDivider :title="$t('game')" :place-in-middle="false" />
                <!-- Game Settings -->
                <div class="flex flex-col space-y-4">
                    <!-- Game Speed -->
                    <RangeInput v-model="settingsForm.gameSpeed" :min="0" :max="10" :step="1" :label="$t('game_speed')"
                        id="gameSpeed" :displayValue="memoizedGameSpeedTitle" :isSeperate="true" />
                    <!-- Hide/Show Grid borders -->
                    <IosCheckbox v-model="settingsForm.showGridLines" :label="$t('grid_lines_visibility')"
                        id="GridLinesVisibility" :isSeperate="true"
                        labelClass="block text-sm text-gray-900 dark:text-white" />
                    <!-- Board Size -->
                    <SelectInput v-model="settingsForm.boardSize" :label="$t('board_size')"
                        :options="translatedOptions.boardSizes" id="boardSize" :isSeperate="true" />
                    <!-- Palette  -->
                    <SelectInput v-model="settingsForm.palette" :label="$t('palette')"
                        :options="translatedOptions.palettes" id="palette" :isSeperate="true" />
                </div>

                <!-- == Form Buttons == -->
                <div class="flex items-center gap-2 w-full mt-4">
                    <button type="submit" :aria-label="$t('save')"
                        class="text-dark bg-primary capitalize text-white hover:brightness-95 transition-[filter] focus:ring-4 focus:outline-none focus:ring-primary/20 focus:z-10 duration-150 font-medium rounded-lg text-sm px-5 py-2 text-center cursor-pointer">
                        {{ $t("save") }}
                    </button>
                    <button @click="() => changeState(false)" type="button" :aria-label="$t('cancel')"
                        class="text-primary capitalize bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary/20 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-primary/90 focus:z-10 cursor-pointer">
                        {{ $t("cancel") }}
                    </button>
                </div>
            </form>
        </div>
    </AppModal>
</template>

<script lang="ts" setup>
import { nextTick, computed, onMounted, watch, ref } from "vue";
import { AppModal, IosCheckbox, FormDivider, SelectInput, RangeInput, DownloadIcon, ImportIcon } from "@/components";
import { useGameEngine, useLocalStorage } from "@/composables";
import { getJsonFile, exportToJson, refreshAppLanguageAndTheme } from "@/helpers/tools";
import { getOptionLists } from "@/helpers/settingsOptions";
import { GridSettings } from "@/types/Grid";
import { useI18n } from 'vue-i18n'

// interfaces
interface InstructionsModalProps {
    isOpen: boolean
    changeState: (e: boolean) => void
    modalTitle: string
}
// props
const props = defineProps<InstructionsModalProps>();

// composables
const { getItem: getStorageItem, setItem: setStorageItem } = useLocalStorage();
const { updateGridData, stopGame, changeGamePlayStatus, updateGridSettings, updateBoardSize, trackAliveCells, grid, localStoredBoardSize } = useGameEngine();
const { t } = useI18n();

const translatedOptions = computed(() => getOptionLists());
// refs
const settingsForm = ref<GridSettings>({
    language: "en",
    mode: 'light',
    showGridLines: true,
    gameSpeed: 5,
    boardSize: "",
    palette: ""
});
// Computed Properties
const memoizedGameSpeedTitle = computed(() => {
    const speedVal = settingsForm.value.gameSpeed;
    return speedVal <= 0 ? t('slow') : speedVal <= 5 ? t('medium') : t('high');
});
// functions
const onSettingsFormSubmission = () => {
    // stops the game
    stopGame();
    changeGamePlayStatus(false);
    // updates the current grid settings
    updateGridSettings(settingsForm.value);
    // updates the settings in Localstorage
    setStorageItem("settings", settingsForm.value);
    // updates the app language and theme after setting them
    const storedSettingsData = getStorageItem("settings");
    refreshAppLanguageAndTheme(storedSettingsData);
    // closes the modal
    nextTick(() => {
        props.changeState(false);
    })
}
const importGridFromJson = async (e: Event) => {
    const importedData = await getJsonFile(e);
    const { grid, boardSize } = importedData || {};
    const isValidGridArray = Array.isArray(grid) && grid.every(Boolean);
    if (isValidGridArray) return;
    // saves it in LS
    setStorageItem("grid", grid);
    // updates the grid's size
    updateBoardSize(boardSize);
    // updates the current grid
    updateGridData(grid);
    // counts the alive cells in the grid
    trackAliveCells();

    // closes the settings modal to let the user see the new grid they imported
    props.changeState(false);
}

const exportGridToAJsonFile = () => {
    const newFileData = {
        boardSize: localStoredBoardSize.value,
        grid: grid.value
    }
    exportToJson(newFileData, 'Grid')
};
const resetFormData = () => {
    // populate form data with the previously stored settings in LS
    const storedSettings = getStorageItem("settings");
    if(Object.keys(storedSettings || {}).length >0){
       settingsForm.value = getStorageItem("settings"); 
    }
}
// Watchers
watch(() => props.isOpen, (val) => {
    if(!val){
        resetFormData();
    }
});
// Lifecycle Hooks
onMounted(() => {
    resetFormData();
});

</script>
