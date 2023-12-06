<template>
  <div
    ref="dropdown"
    class="popup-container"
    tabindex="-1"
    :aria-expanded="dropdownVisible"
    :class="{ 'allow-hover': allowHover }"
  >
    <button
      v-bind="$attrs"
      ref="dropdownButton"
      :class="{ 'popout-open': dropdownVisible }"
      tabindex="-1"
      @click="toggleDropdown"
    >
      <slot></slot>
    </button>
    <div
      v-if="allowHover"
      class="hover-bounding-box"
      :class="`position-${position}-${direction}`"
    ></div>
    <div
      class="popup-menu"
      :class="`position-${position}-${direction} ${dropdownVisible ? 'visible' : ''}`"
    >
      <slot name="menu"> </slot>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: 'bottom',
  },
  direction: {
    type: String,
    default: 'left',
  },
  allowHover: {
    type: Boolean,
    default: false,
  },
})
defineOptions({
  inheritAttrs: false,
})

const dropdownVisible = ref(false)
const dropdown = ref(null)
const dropdownButton = ref(null)

const toggleDropdown = () => {
  if (!props.disabled) {
    dropdownVisible.value = !dropdownVisible.value
    if (!dropdownVisible.value) {
      dropdownButton.value.focus()
    }
  }
}

const hide = () => {
  dropdownVisible.value = false
  dropdownButton.value.focus()
}

const show = () => {
  dropdownVisible.value = true
}

defineExpose({
  show,
  hide,
})

const handleClickOutside = (event) => {
  const elements = document.elementsFromPoint(event.clientX, event.clientY)
  if (
    dropdown.value.$el !== event.target &&
    !elements.includes(dropdown.value.$el) &&
    !dropdown.value.contains(event.target)
  ) {
    dropdownVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
.popup-container {
  position: relative;

  &.allow-hover .hover-bounding-box {
    position: absolute;
    inset: 0;
    border-radius: var(--radius-md);
    z-index: 1;

    // Debug properties
    // background-color: red;
    // opacity: 0.1;

    // Q: Why is this here and also below?
    // A: For the few browsers that do not yet support :has(), this at least
    //    makes it mostly functional.
    &:hover {
      &.position-bottom-left,
      &.position-bottom-right {
        bottom: -1rem;
      }

      &.position-top-left,
      &.position-top-right {
        top: -1rem;
      }

      &.position-left-up,
      &.position-left-down {
        left: -1rem;
      }

      &.position-right-up,
      &.position-right-down {
        right: -1rem;
      }
    }
  }

  &:not(.allow-hover) .popup-menu:not(.visible):not(:focus-within),
  &.allow-hover:not(:has(.hover-bounding-box:hover)):not(:has(.popup-menu:hover))
    .popup-menu:not(.visible):not(:focus-within) {
    pointer-events: none;

    *,
    ::before,
    ::after {
      pointer-events: none;
    }
  }

  &.allow-hover:has(.hover-bounding-box:hover),
  &.allow-hover:has(.popup-menu:hover),
  :has(.popup-menu.visible),
  :has(.popup-menu:focus-within) {
    :deep(.btn-dropdown-animation svg:last-child) {
      transform: rotate(180deg);
    }

    .hover-bounding-box {
      &.position-bottom-left,
      &.position-bottom-right {
        bottom: -1rem;
      }

      &.position-top-left,
      &.position-top-right {
        top: -1rem;
      }

      &.position-left-up,
      &.position-left-down {
        left: -1rem;
      }

      &.position-right-up,
      &.position-right-down {
        right: -1rem;
      }
    }
  }

  &.allow-hover .hover-bounding-box:hover + .popup-menu,
  &.allow-hover .popup-menu:hover,
  .popup-menu.visible,
  .popup-menu:focus-within {
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
      bottom: 0rem;
      right: calc(100% + var(--gap-sm));
    }

    &.position-left-down {
      top: 0rem;
      right: calc(100% + var(--gap-sm));
    }

    &.position-right-up {
      bottom: 0rem;
      left: calc(100% + var(--gap-sm));
    }

    &.position-right-down {
      top: 0rem;
      left: calc(100% + var(--gap-sm));
    }
  }

  .popup-menu {
    --_animation-offset: -1rem;
    position: absolute;
    scale: 0.75;
    border: 1px solid var(--color-button-bg);
    padding: var(--gap-sm);
    width: fit-content;
    border-radius: var(--radius-md);
    background-color: var(--color-raised-bg);
    box-shadow: var(--shadow-floating);
    z-index: 10;
    opacity: 0;
    transition: bottom 0.125s ease-in-out, top 0.125s ease-in-out, left 0.125s ease-in-out,
      right 0.125s ease-in-out, opacity 0.125s ease-in-out, scale 0.125s ease-in-out;

    @media (prefers-reduced-motion) {
      transition: none !important;
    }

    &.position-bottom-left {
      top: calc(100% + var(--gap-sm) - 1rem);
      right: -1rem;
    }

    &.position-bottom-right {
      top: calc(100% + var(--gap-sm) - 1rem);
      left: -1rem;
    }

    &.position-top-left {
      bottom: calc(100% + var(--gap-sm) - 1rem);
      right: -1rem;
    }

    &.position-top-right {
      bottom: calc(100% + var(--gap-sm) - 1rem);
      left: -1rem;
    }

    &.position-left-up {
      bottom: -1rem;
      right: calc(100% + var(--gap-sm) - 1rem);
    }

    &.position-left-down {
      top: -1rem;
      right: calc(100% + var(--gap-sm) - 1rem);
    }

    &.position-right-up {
      bottom: -1rem;
      left: calc(100% + var(--gap-sm) - 1rem);
    }

    &.position-right-down {
      top: -1rem;
      left: calc(100% + var(--gap-sm) - 1rem);
    }

    .btn {
      white-space: nowrap;
    }
  }
}
</style>
