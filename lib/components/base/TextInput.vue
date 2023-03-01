<template>
<input
  type="text"
  class="text-input"
  :value="value"
  :placeholder="placeholder"
  @input="$emit('input', $event.target.value)"
/>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    value : { type: String , required: false, default: ''},
    label: { type: String , required: false, default: ''},
    hint: { type: String, required:false , default:'hint'},
    icon: { type: String, required: false , default: '' },
    placeholder: { type: String, required: false, default: ''}
  },
  emits: ['input'],
}
</script>

<style lang="scss" scoped>
.text-input {
  border-radius: var(--size-rounded-sm);
  box-sizing: border-box;
  border: 2px solid transparent;
  // safari iOS rounds inputs by default
  // set the appearance to none to prevent this
  appearance: none !important;
  background: var(--color-button-bg);
  color: var(--color-text);
  padding: 0.5rem 1rem;
  font-weight: var(--font-weight-medium);
  outline: 2px solid transparent;
  box-shadow: var(--shadow-inset-sm), 0 0 0 0 transparent;
  transition: box-shadow 0.1s ease-in-out;
  min-height: 40px;

  &:focus,
  &:focus-visible {
    box-shadow: inset 0 0 0 transparent, 0 0 0 0.25rem var(--color-brand-shadow);
    color: var(--color-button-text-active);
  }

  &:disabled,
  &[disabled] {
    opacity: 0.6;
    pointer-events: none;
    cursor: not-allowed;
  }

  &:focus::placeholder {
    opacity: 0.8;
  }

  &::placeholder {
    color: var(--color-button-text);
    opacity: 0.6;
  }
}
</style>
