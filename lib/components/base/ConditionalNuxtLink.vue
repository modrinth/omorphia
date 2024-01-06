<template>
  <router-link v-if="isLink" :to="to">
    <slot />
  </router-link>
  <span v-else>
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{ to: string; isLink: boolean }>()
</script>
