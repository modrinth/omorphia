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

const emit = defineEmits(['update:modelValue'])
function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>
