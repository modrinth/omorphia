<template>
  <div class="root-container">
    <input
      ref="value"
      v-model="currentValue"
      type="number"
      min="0"
      max="10"
      class="slider-input"
      @input="onTextInput"
    >
    <div class="slider-component">
      <div class="slide-container">
          <input
            ref="input"
            v-model="currentValue"
            type="range"
            :min="min"
            :max="max"
            :step="step"
            class="slider"
            :style="{
              '--current-value': currentValue,
              '--min-value': min,
              '--max-value': max
            }"
            @input="onInput"
          >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 10
    }
  },
  emits: ['input'],
  data() {
    return {
      dragging: false,
      sliderWidth: 0,
      objectPosition: 0,
      startOffset: 0,
      currentValue: this.value
    };
  },
  computed: {
    inputValueValid: {
      get() {
        return this.currentValue
      },
      set(newValue) {
        if (newValue < this.min) {
          this.currentValue = this.min
        } else if (newValue > this.max) {
          this.currentValue = this.max
        } else if (!newValue) {
          this.currentValue = this.min
        } else {
          this.currentValue = newValue - (newValue % this.step)
        }
        this.updateObjectPosition();
      }
    }
  },
  watch: {
    value() {
      this.updateObjectPosition();
    }
  },
  mounted() {
    this.sliderWidth = this.$refs.sliderBar.offsetWidth;
    this.updateObjectPosition();
  },
  methods: {
    onInput() {
      // this.currentValue is a string because HTML is weird
      this.$emit('input', parseInt(this.currentValue));
    },
    onTextInput() {
      this.inputValueValid = parseInt(this.currentValue);
    },
  }
}
</script>

<style scoped>
.root-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.slider-component .slide-container {
  width: 100%;
}

.slider-component .slide-container .slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background:  linear-gradient(to right, var(--color-brand) 0%, var(--color-brand) calc((var(--current-value) - var(--min-value)) / (var(--max-value) - var(--min-value)) * 100%), #c2c2c2 calc((var(--current-value) - var(--min-value)) / (var(--max-value) - var(--min-value)) * 100%), #c2c2c2 100%);
  background-size: 100% 100%;
  outline: none;
}

.slider-component .slide-container .slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: var(--color-brand);
  cursor: pointer;
  border-radius: 50%;
  transition: .2s;
}

.slider-component .slide-container .slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: var(--color-brand);
  cursor: pointer;
  border-radius: 50%;
  transition: .2s;
}

.slider-component .slide-container .slider:hover::-webkit-slider-thumb {
  width: 24px;
  height: 24px;
  transition: .2s;
}

.slider-input {
  width: 100px;
  min-height: 40px;
  font-weight: var(--font-weight-medium);
  border-radius: 4px;
  padding: 0 8px;
  margin-right: 8px;
  font-size: 14px;
  color: var(--color-base);
  background: var(--color-button-bg);
  outline: none;
  transition: outline 0.2s ease-in-out;
}

.slider-input:focus {
  outline: var(--color-brand) solid 2px;
  transition: outline 0.2s ease-in-out;
}
</style>
