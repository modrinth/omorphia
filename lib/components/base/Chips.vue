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
<script setup>
import { CheckIcon, Button } from '@'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    required: true,
    type: String,
  },
  items: {
    required: true,
    type: Array,
  },
  neverEmpty: {
    default: true,
    type: Boolean,
  },
  formatLabel: {
    default: (x) => x,
    type: Function,
  },
  capitalize: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const selected = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

function toggleItem(item) {
  if (selected.value === item && !props.neverEmpty) {
    selected.value = null
  } else {
    selected.value = item
  }
}

if (props.items.length > 0 && props.neverEmpty) {
  selected.value = props.items[0]
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
