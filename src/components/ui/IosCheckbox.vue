<template>
    <span
        :class="`${isSeperate ? 'grid grid-cols-1 md:grid-cols-2 w-full items-center' : 'inline-flex items-center gap-1.5 md:gap-2 max-w-fit '}`.trim()">
        <label :for="inputId" :class="`${labelClass} max-w-fit`">{{ label }}</label>
        <label class="relative inline-flex items-center cursor-pointer select-none max-w-fit">
            <input :id="inputId" type="checkbox" class="sr-only peer" :checked="modelValue"
                @change="onStateChange" />
            <div
                class="w-10 h-5 md:w-11 md:h-6 bg-gray-300 rounded-full peer peer-checked:bg-orange-500 transition-colors duration-300">
            </div>
            <div
                class="absolute left-0.5 top-0.5 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform duration-300">
            </div>
        </label>
    </span>
</template>

<script lang="ts" setup>
// Vars
const uniqueId = `toggle-${new Date()}`;

// interface
interface IosCheckbox {
    label: string
    modelValue: boolean,
    isSeperate?: boolean,
    labelClass?: string,
    id: string
}
// props
const { modelValue, id } = defineProps<IosCheckbox>()

// emits
const emits = defineEmits(['update:modelValue']);

// functions
const onStateChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emits('update:modelValue', target?.checked)
}
// Default values
const inputId = id ?? uniqueId
</script>
