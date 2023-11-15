<template>
  <input
    :id="id"
    type="checkbox"
    class="switch stylized-toggle"
    :disabled="disabled"
    :checked="checked"
    @change="toggle"
  />
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
  defineProps<{
    id: string
    modelValue: boolean
    checked: boolean
    disabled: boolean
  }>(),
  {
    disabled: false,
  }
)

function toggle() {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>
