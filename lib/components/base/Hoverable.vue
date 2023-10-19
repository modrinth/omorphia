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
    <div class="popup-menu">
      <slot name="popup" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup-container {
  position: relative;

  .popup-menu {
    --_animation-offset: -1rem;
    position: absolute;
    scale: 0.75;
    box-shadow: var(--shadow-floating);
    z-index: 10;
    opacity: 0;
    transition: bottom 0.125s ease-in-out, top 0.125s ease-in-out, left 0.125s ease-in-out,
      right 0.125s ease-in-out, opacity 0.125s ease-in-out, scale 0.125s ease-in-out;

    &.position-bottom-left {
      top: calc(100% + var(--gap-sm) - 1rem);
      right: -1rem;
    }

    &.position-bottom-right {
      margin-top: var(--gap-sm);
      top: calc(100% + var(--gap-sm) - 1rem);
      left: -1rem;
    }

    &.position-top-left {
      margin-bottom: var(--gap-sm);
      bottom: calc(100% + var(--gap-sm) - 1rem);
      right: -1rem;
    }

    &.position-top-right {
      margin-bottom: var(--gap-sm);
      bottom: calc(100% + var(--gap-sm) - 1rem);
      left: -1rem;
    }

    &.position-left-up {
      margin-right: var(--gap-sm);
      bottom: -1rem;
      right: calc(100% + var(--gap-sm) - 1rem);
    }

    &.position-left-down {
      margin-right: var(--gap-sm);
      top: -1rem;
      right: calc(100% + var(--gap-sm) - 1rem);
    }

    &.position-right-up {
      margin-left: var(--gap-sm);
      bottom: -1rem;
      left: calc(100% + var(--gap-sm) - 1rem);
    }

    &.position-right-down {
      margin-left: var(--gap-sm);
      top: -1rem;
      left: calc(100% + var(--gap-sm) - 1rem);
    }
  }
}

.popup-container:hover .popup-menu,
.popup-menu:hover {
  opacity: 1;
  scale: 1;

  &.position-bottom-left {
    top: calc(100% + var(--gap-sm));
    right: 0;
  }

  &.position-bottom-right {
    top: calc(100% + var(--gap-sm));
    left: 0;
  }

  &.position-top-left {
    bottom: calc(100% + var(--gap-sm));
    right: 0;
  }

  &.position-top-right {
    bottom: calc(100% + var(--gap-sm));
    left: 0;
  }

  &.position-left-up {
    bottom: 0;
    right: calc(100% + var(--gap-sm));
  }

  &.position-left-down {
    top: 0;
    right: calc(100% + var(--gap-sm));
  }

  &.position-right-up {
    bottom: 0;
    left: calc(100% + var(--gap-sm));
  }

  &.position-right-down {
    top: 0;
    left: calc(100% + var(--gap-sm));
  }
}
</style>
