<template>
  <div :class="`${isSeperate ? 'grid grid-cols-1 md:grid-cols-2 w-full items-center' : 'inline-flex items-center gap-1.5 md:gap-2 max-w-fit '}`.trim()">
    <label :for="inputId" class="block text-sm text-gray-900 dark:text-white">
      {{ label }}
    </label>
    <select
      :id="inputId"
      :value="modelValue"
      @change="handleInputChange"
      class="block w-full rounded-md border outline-orange-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm px-4 py-2 transition duration-200"
    >
      <option v-for="(option, i) in options" :key="i" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
// Vars
const uniqueId = `toggle-${new Date()}`;

// Interfaces
interface SelectOption {
  value: string | number | object
  label: string | number
}
interface SelectInputProps {
  modelValue: string | number | object
  options?: SelectOption[]
  id?: string
  label?: string,
  isSeperate?: boolean
}

// Props
const props = defineProps<SelectInputProps>()

// Emit
const emits = defineEmits(['update:modelValue'])

// Functions
const handleInputChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emits('update:modelValue', target.value)
}

// Default values
const inputId = props.id ?? uniqueId
const label = props.label ?? 'Select Game Mode'
</script>
