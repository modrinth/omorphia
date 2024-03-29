<template>
  <div class="scrollable-pane-wrapper">
    <div
      class="wrapper-wrapper"
      :class="{
        'top-fade': !scrollableAtTop,
        'bottom-fade': !scrollableAtBottom,
      }"
    >
      <div ref="scrollablePane" class="scrollable-pane" @scroll="onScroll">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollableAtTop = ref(true)
const scrollableAtBottom = ref(false)
const scrollablePane = ref(null)
let resizeObserver
onMounted(() => {
  resizeObserver = new ResizeObserver(function () {
    if (scrollablePane.value) {
      updateFade(
        scrollablePane.value.scrollTop,
        scrollablePane.value.offsetHeight,
        scrollablePane.value.scrollHeight
      )
    }
  })
  resizeObserver.observe(scrollablePane.value)
})
onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
function updateFade(scrollTop, offsetHeight, scrollHeight) {
  scrollableAtBottom.value = Math.ceil(scrollTop + offsetHeight) >= scrollHeight
  scrollableAtTop.value = scrollTop === 0
}
function onScroll({ target: { scrollTop, offsetHeight, scrollHeight } }) {
  updateFade(scrollTop, offsetHeight, scrollHeight)
}
</script>

<style lang="scss" scoped>
.scrollable-pane-wrapper {
  display: flex;
  flex-direction: column;
  max-height: 19rem;
  position: relative;
}
.wrapper-wrapper {
  flex-grow: 1;
  display: flex;
  overflow: hidden;
  position: relative;
  --_fade-height: 4rem;
  margin-bottom: var(--gap-sm);
  &.top-fade::before,
  &.bottom-fade::after {
    opacity: 1;
  }
  &::before,
  &::after {
    content: '';
    left: 0;
    right: 1rem;
    opacity: 0;
    position: absolute;
    pointer-events: none;
    transition: opacity 0.125s ease;
    height: var(--_fade-height);
    z-index: 1;
  }
  &::before {
    top: 0;
    background-image: linear-gradient(var(--color-raised-bg), transparent);
  }
  &::after {
    bottom: 0;
    background-image: linear-gradient(transparent, var(--color-raised-bg));
  }
}
.scrollable-pane {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  ::-webkit-scrollbar {
    transition: all;
  }
  &:not(:hover)::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
}
</style>
