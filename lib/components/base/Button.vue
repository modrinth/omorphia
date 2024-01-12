<script setup lang="ts">
import { ExternalIcon, UnknownIcon } from '@'

import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    link?: string
    external?: boolean
    action?: (event: MouseEvent) => void
    color?:
      | 'default'
      | 'danger'
      | 'primary'
      | 'red'
      | 'orange'
      | 'green'
      | 'blue'
      | 'purple'
      | 'gray'
      | 'secondary'
      | 'highlight'
    iconOnly?: boolean
    large?: boolean
    outline?: boolean
    transparent?: boolean
    hoverFilled?: boolean
    hoverFilledOnly?: boolean
    disabled?: boolean
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
    disabled: false
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
      'btn-transparent': transparent,
      'btn-hover-filled': hoverFilled,
      'btn-hover-filled-only': hoverFilledOnly,
      'btn-outline': outline,
      'color-accent-contrast': accentedButton,
      'disabled': disabled,
      [`btn-${color}`]: true,
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
      'btn-transparent': transparent,
      'btn-hover-filled': hoverFilled,
      'btn-hover-filled-only': hoverFilledOnly,
      'btn-outline': outline,
      'color-accent-contrast': accentedButton,
      'disabled': disabled,
      [`btn-${color}`]: true,
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
      'btn-transparent': transparent,
      'btn-hover-filled': hoverFilled,
      'btn-hover-filled-only': hoverFilledOnly,
      'btn-outline': outline,
      'color-accent-contrast': accentedButton,
      [`btn-${color}`]: true,
    }"
    :disabled="disabled"
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
