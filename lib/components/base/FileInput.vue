<template>
  <label :class="{ 'long-style': longStyle }" @drop.prevent="handleDrop" @dragover.prevent>
    <slot />
    {{ prompt }}
    <input
      type="file"
      :multiple="multiple"
      :accept="accept"
      :disabled="disabled"
      @change="handleChange"
    />
  </label>
</template>

<script setup>
import { ref } from 'vue'
import { fileIsValid } from '@'

const props = defineProps({
  prompt: {
    type: String,
    default: 'Select file',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: null,
  },
  /**
   * The max file size in bytes
   */
  maxSize: {
    type: Number,
    default: null,
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  shouldAlwaysReset: {
    type: Boolean,
    default: false,
  },
  longStyle: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['change'])

const files = ref([])
function addFiles(newFiles, shouldNotReset) {
  if (!shouldNotReset || props.shouldAlwaysReset) {
    files.value = newFiles
  }
  const validationOptions = { maxSize: props.maxSize, alertOnInvalid: true }
  files.value = [...files.value].filter((file) => fileIsValid(file, validationOptions))
  if (files.value.length > 0) {
    emit('change', files.value)
  }
}

function handleDrop(e) {
  addFiles(e.dataTransfer.files)
}

function handleChange(e) {
  addFiles(e.target.files)
}
</script>

<style lang="scss" scoped>
label {
  flex-direction: unset;
  max-height: unset;
  svg {
    height: 1rem;
  }
  input {
    display: none;
  }
  &.long-style {
    display: flex;
    padding: 1.5rem 2rem;
    justify-content: center;
    align-items: center;
    grid-gap: 0.5rem;
    background-color: var(--color-button-bg);
    border-radius: var(--radius-sm);
    border: dashed 0.3rem var(--color-contrast);
    cursor: pointer;
    color: var(--color-contrast);
  }
}
</style>
