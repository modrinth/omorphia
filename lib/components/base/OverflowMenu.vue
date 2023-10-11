<template>
  <PopoutMenu
    ref="dropdown"
    v-bind="$attrs"
    :disabled="disabled"
    :position="position"
    :direction="direction"
  >
    <slot></slot>
    <template #menu>
      <Button
        v-for="option in options"
        :key="`option-${option.id}`"
        :color="option.color ? option.color : 'default'"
        transparent
        :action="
          () => {
            option.action()
            close()
          }
        "
      >
        <template v-if="!$slots[option.id]">{{ option.id }}</template>
        <slot :name="option.id"></slot>
      </Button>
    </template>
  </PopoutMenu>
</template>

<script setup>
import { ref } from 'vue'
import PopoutMenu from '@/components/base/PopoutMenu.vue'
import Button from '@/components/base/Button.vue'

defineProps({
  options: {
    type: Array,
    required: true,
  },
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
})
defineOptions({
  inheritAttrs: false,
})

const dropdown = ref(null)

const close = () => {
  console.log('closing!')
  dropdown.value.hide()
}
</script>

<style lang="scss" scoped>
.btn {
  white-space: nowrap;
  width: 100%;
  box-shadow: none;
  --text-color: var(--color-base);
  --background-color: transparent;
  justify-content: flex-start;

  &:not(:last-child) {
    margin-bottom: var(--gap-xs);
  }
}
</style>