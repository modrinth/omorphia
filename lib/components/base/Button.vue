<script setup lang="ts">
import { ExternalIcon, UnknownIcon } from '@'

import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    link?: string
    external: boolean
    action?: (event: MouseEvent) => void
    color: 'default' | 'danger'| 'primary'| 'red'| 'orange'| 'green'| 'blue'| 'purple'| 'gray' | 'secondary' | 'highlight'
    iconOnly: boolean
    large: boolean
    outline: boolean
    transparent: boolean
    hoverFilled: boolean
    hoverFilledOnly: boolean
  }>(),
  {
    link: undefined,
    external: false,
    action: undefined,
    color: 'default',
    iconOnly: false,
    large: false,
    outline: false,
    transparent: false,
    hoverFilled: false,
    hoverFilledOnly: false,
  }
)

const accentedButton = computed(() =>
  ['danger', 'primary', 'red', 'orange', 'green', 'blue', 'purple', 'gray'].includes(props.color)
)
</script>

<template>
  <router-link
    v-if="link && link.startsWith('/')"
    class="btn"
    :class="{
      'icon-only': iconOnly,
      'btn-large': large,
      'btn-danger': color === 'danger',
      'btn-primary': color === 'primary',
      'btn-secondary': color === 'secondary',
      'btn-highlight': color === 'highlight',
      'btn-red': color === 'red',
      'btn-orange': color === 'orange',
      'btn-green': color === 'green',
      'btn-blue': color === 'blue',
      'btn-purple': color === 'purple',
      'btn-gray': color === 'gray',
      'btn-transparent': transparent,
      'btn-hover-filled': hoverFilled,
      'btn-hover-filled-only': hoverFilledOnly,
      'btn-outline': outline,
      'color-accent-contrast': accentedButton,
    }"
    :to="link"
    :target="external ? '_blank' : '_self'"
  >
    <slot />
    <ExternalIcon v-if="external && !iconOnly" class="external-icon" />
    <UnknownIcon v-if="!$slots.default" />
  </router-link>
  <a
    v-else-if="link"
    class="btn"
    :class="{
      'icon-only': iconOnly,
      'btn-large': large,
      'btn-danger': color === 'danger',
      'btn-primary': color === 'primary',
      'btn-secondary': color === 'secondary',
      'btn-highlight': color === 'highlight',
      'btn-red': color === 'red',
      'btn-orange': color === 'orange',
      'btn-green': color === 'green',
      'btn-blue': color === 'blue',
      'btn-purple': color === 'purple',
      'btn-gray': color === 'gray',
      'btn-transparent': transparent,
      'btn-hover-filled': hoverFilled,
      'btn-hover-filled-only': hoverFilledOnly,
      'btn-outline': outline,
      'color-accent-contrast': accentedButton,
    }"
    :href="link"
    :target="external ? '_blank' : '_self'"
  >
    <slot />
    <ExternalIcon v-if="external && !iconOnly" class="external-icon" />
    <UnknownIcon v-if="!$slots.default" />
  </a>
  <button
    v-else
    class="btn"
    :class="{
      'icon-only': iconOnly,
      'btn-large': large,
      'btn-danger': color === 'danger',
      'btn-primary': color === 'primary',
      'btn-secondary': color === 'secondary',
      'btn-highlight': color === 'highlight',
      'btn-red': color === 'red',
      'btn-orange': color === 'orange',
      'btn-green': color === 'green',
      'btn-blue': color === 'blue',
      'btn-purple': color === 'purple',
      'btn-gray': color === 'gray',
      'btn-transparent': transparent,
      'btn-hover-filled': hoverFilled,
      'btn-hover-filled-only': hoverFilledOnly,
      'btn-outline': outline,
      'color-accent-contrast': accentedButton,
    }"
    @click="action"
  >
    <slot />
    <UnknownIcon v-if="!$slots.default" />
  </button>
</template>

<style lang="scss" scoped>
:where(button) {
  background: none;
  color: var(--color-base);
}
</style>
