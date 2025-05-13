<template>
    <div :class="`${isSeperate ? 'grid grid-cols-1 md:grid-cols-2 w-full items-center' : 'inline-flex items-center gap-1.5 md:gap-2 max-w-fit '}`.trim()">
        <label :for="id" class="block text-sm text-gray-900 dark:text-white">
            {{ label }}<span v-if="displayValue"> • {{ displayValue }}</span>
        </label>
        <input :id="id" type="range" :min="min" :max="max" :step="step" :value="modelValue"
            @input="handleInputChange" class="w-full h-2 bg-gray-200 rounded-lg appearance-none
             [&::-webkit-slider-thumb]:appearance-none
             [&::-webkit-slider-thumb]:h-5
             [&::-webkit-slider-thumb]:w-5
             [&::-webkit-slider-thumb]:rounded-full
             [&::-webkit-slider-thumb]:bg-orange-500
             cursor-pointer dark:bg-gray-800" />
    </div>
</template>

<script lang="ts" setup>
interface RangeSliderProps {
    modelValue: number | string
    min?: number
    max?: number
    step?: number
    id?: string
    label?: string
    displayValue?: string | number
    isSeperate: boolean
}

const props = defineProps<RangeSliderProps>()

const emits = defineEmits(['update:modelValue'])

// Functions
const handleInputChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emits('update:modelValue', target.value)
}

// Defaults
const min = props.min ?? 0
const max = props.max ?? 8
const step = props.step ?? 1
const id = props.id ?? 'steps-range'
const label = props.label ?? 'Game Speed'
const isSeperate = props.isSeperate ?? false
</script>
