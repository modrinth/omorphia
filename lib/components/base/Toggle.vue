<template>
  <input
    :id="id"
    type="checkbox"
    class="switch stylized-toggle"
    :checked="checked"
    @change="toggle"
  />
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
  },
  checked: {
    type: Boolean,
    required: true,
  },
})

function toggle() {
  if (!disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>
