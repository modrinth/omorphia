<template>
  <div
    class="dropdown-overlay"
    @click="hide"
  />
  <div
    class="custom-dropdown-select"
    :class="{
        'round-bottom': !dropdownOpen,
        'flat-bottom': dropdownOpen
      }"
    @click="toggleDropdown"
  >
    <label v-if="label">{{ label }}</label>
    <div v-if="selectedOption" class="selected-option">
      {{ selectedOption }}
    </div>
    <div v-else class="selected-option">
      {{placeholder}}
    </div>
    <ul v-show="dropdownOpen" class="options">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="option"
        :class="{
          'current': option === selectedOption
        }"
        @click="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  emits: ['input'],
  data() {
    return {
      dropdownOpen: false,
      selectedOption: this.value
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.dropdownOpen = 'false';
      this.$emit('input', option);
    },
    hide() {
      this.dropdownOpen = 'false';
    }
  }
};
</script>

<style scoped lang="scss">
.dropdown-overlay {
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 19;
}

.custom-dropdown-select {
  position: relative;
  display: inline-block;
  background: var(--color-button-bg);
}

.round-bottom {
  border-radius: var(--radius-lg);
}

.flat-bottom {
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.selected-option {
  cursor: pointer;
  padding: 8px 16px;
  overflow: hidden;
  box-shadow:  var(--shadow-inset-lg), var(--shadow-raised);
}

.options {
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  left: 0;
  top: 100%;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  background-color: var(--color-button-bg);
  z-index: 1;
  overflow: hidden;
  box-shadow:  var(--shadow-inset-lg), var(--shadow-raised);
}

.option {
  padding: 8px 16px;
  cursor: pointer;

  &.current {
    background: var(--color-brand);
    color: var(--color-accent-contrast)
  }
}

.option:hover:not(.current) {
  background: var(--color-button-bg-active);
  color: var(--color-contrast)
}
</style>
