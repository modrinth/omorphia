<template>
  <router-link v-if="isLink" :to="to">
    <slot />
  </router-link>
  <span v-else>
    <slot />
  </span>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  to: {
    type: String,
    required: true,
  },
  isLink: {
    type: Boolean,
    required: true,
  },
})
</script>
