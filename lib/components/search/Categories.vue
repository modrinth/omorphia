<template>
  <div class="categories">
    <slot />
    <span v-for="category in categories" :key="category">
      {{ formatCategory(category) }}
    </span>
  </div>
</template>
<script setup>
import { formatCategory } from '@'

defineProps({
  categories: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--gap-xs);

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--color-tag-bg);
    padding: 0 8px;
    line-height: 1.5em;
    border-radius: var(--radius-max);
    font-size: var(--font-size-sm);
    text-transform: lowercase;

    &:not(.version-badge) {
      color: var(--color-secondary);
    }
  }
}
</style>
