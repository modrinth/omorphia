<script setup>
import { ref } from 'vue'

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

const showPopup = ref(false)
</script>

<template>
  <div
    class="popup-container"
    tabindex="-1"
    @mouseover="showPopup = true"
    @mouseleave="showPopup = false"
  >
    <slot></slot>
    <transition name="fade-scale">
      <div v-show="showPopup" class="popup-menu" :class="`position-${position}-${direction}`">
        <slot name="popup" />
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.popup-container {
  position: relative;

  .popup-menu {
    position: absolute;
    box-shadow: var(--shadow-floating);
    z-index: 10;

    &.position-bottom-left {
      padding-top: var(--gap-sm);
      top: 100%;
      right: 0;
    }

    &.position-bottom-right {
      padding-top: var(--gap-sm);
      top: 100%;
      left: 0;
    }

    &.position-top-left {
      padding-bottom: var(--gap-sm);
      bottom: 100%;
      right: 0;
    }

    &.position-top-right {
      padding-bottom: var(--gap-sm);
      bottom: 100%;
      left: 0;
    }

    &.position-left-up {
      padding-right: var(--gap-sm);
      bottom: 0;
      right: 100%;
    }

    &.position-left-down {
      padding-right: var(--gap-sm);
      top: 0;
      right: 100%;
    }

    &.position-right-up {
      padding-left: var(--gap-sm);
      bottom: 0;
      left: 100%;
    }

    &.position-right-down {
      padding-left: var(--gap-sm);
      top: 0;
      left: 100%;
    }
  }
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: bottom 0.125s ease-in-out, top 0.125s ease-in-out, left 0.125s ease-in-out,
    right 0.125s ease-in-out, opacity 0.125s ease-in-out, scale 0.125s ease-in-out;

  scale: 1;
  pointer-events: auto;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  scale: 0.75; // starting scale
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  transition-delay: 0.5s;
  opacity: 1;
  scale: 1; // ending scale
}
</style>
