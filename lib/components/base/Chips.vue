<template>
  <div class="chips">
    <Button
      v-for="item in items"
      :key="item"
      class="btn"
      :class="{ selected: selected === item, capitalize: capitalize }"
      @click="toggleItem(item)"
    >
      <CheckIcon v-if="selected === item" />
      <span>{{ formatLabel(item) }}</span>
    </Button>
  </div>
</template>
<script setup lang="ts">
import { CheckIcon, Button } from '@'
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    items: string[]
    neverEmpty: boolean
    formatLabel: (label: string) => string
    capitalize: boolean
  }>(),
  { neverEmpty: true, formatLabel: (label: string) => label, capitalize: true }
)

const emit = defineEmits<{
  'update:modelValue': [model: string | null]
}>()

let selected = ref<string | null>(null)

watch(selected, () => {
  emit('update:modelValue', selected.value)
})

if (props.items.length > 0 && props.neverEmpty) {
  selected.value = props.items[0]
}

function toggleItem(item: string) {
  console.log(selected.value === item, props.neverEmpty)

  if (selected.value === item && !props.neverEmpty) {
    selected.value = null
  } else {
    selected.value = item
  }
}
</script>

<style lang="scss" scoped>
.chips {
  display: flex;
  grid-gap: 0.5rem;
  flex-wrap: wrap;

  .btn {
    &.capitalize {
      text-transform: capitalize;
    }

    svg {
      width: 1em;
      height: 1em;
    }

    &:focus-visible {
      outline: 0.25rem solid #ea80ff;
      border-radius: 0.25rem;
    }
  }

  .selected {
    color: var(--color-contrast);
    background-color: var(--color-brand-highlight);
    box-shadow: inset 0 0 0 transparent, 0 0 0 2px var(--color-brand);
  }
}
</style>
