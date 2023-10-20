<script setup>
defineProps({
  position: {
    type: String,
    default: 'bottom',
  },
  direction: {
    type: String,
    default: 'left',
  },
})
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="popup-container" tabindex="-1">
    <slot></slot>
    <div class="popup-menu" :class="`position-${position}-${direction}`">
      <slot name="popup" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup-container {
  position: relative;

  .popup-menu {
    position: absolute;
    scale: 0.75;
    box-shadow: var(--shadow-floating);
    z-index: 10;
    opacity: 0;
    pointer-events: none;
    transition: bottom 0.125s ease-in-out, top 0.125s ease-in-out, left 0.125s ease-in-out,
      right 0.125s ease-in-out, opacity 0.125s ease-in-out, scale 0.125s ease-in-out;

    &.position-bottom-left {
      padding-top: var(--gap-sm);
      top: calc(100% + var(--gap-sm) - 1rem);
      right: -1rem;
    }

    &.position-bottom-right {
      padding-top: var(--gap-sm);
      top: calc(100% + var(--gap-sm) - 1rem);
      left: -1rem;
    }

    &.position-top-left {
      padding-bottom: var(--gap-sm);
      bottom: calc(100% + var(--gap-sm) - 1rem);
      right: -1rem;
    }

    &.position-top-right {
      padding-bottom: var(--gap-sm);
      bottom: calc(100% + var(--gap-sm) - 1rem);
      left: -1rem;
    }

    &.position-left-up {
      padding-right: var(--gap-sm);
      bottom: -1rem;
      right: calc(100% + var(--gap-sm) - 1rem);
    }

    &.position-left-down {
      padding-right: var(--gap-sm);
      top: -1rem;
      right: calc(100% + var(--gap-sm) - 1rem);
    }

    &.position-right-up {
      padding-left: var(--gap-sm);
      bottom: -1rem;
      left: calc(100% + var(--gap-sm) - 1rem);
    }

    &.position-right-down {
      padding-left: var(--gap-sm);
      top: -1rem;
      left: calc(100% + var(--gap-sm) - 1rem);
    }
  }
}

.popup-container:hover .popup-menu,
.popup-menu:hover {
  opacity: 1;
  scale: 1;
  pointer-events: auto;
  transition-delay: 0.5s;

  &.position-bottom-left {
    top: calc(100%);
    right: 0;
  }

  &.position-bottom-right {
    top: calc(100%);
    left: 0;
  }

  &.position-top-left {
    bottom: calc(100%);
    right: 0;
  }

  &.position-top-right {
    bottom: calc(100%);
    left: 0;
  }

  &.position-left-up {
    bottom: 0;
    right: calc(100%);
  }

  &.position-left-down {
    top: 0;
    right: calc(100%);
  }

  &.position-right-up {
    bottom: 0;
    left: calc(100%);
  }

  &.position-right-down {
    top: 0;
    left: calc(100%);
  }
}
</style>
