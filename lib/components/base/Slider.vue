<template>
  <div class="root-container">
    <input
      type="text"
      ref="value"
      v-model="currentValue"
      class="slider-input"
      @input="onTextInput"
    />
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
    },
    forceStep: {
      type: Boolean,
      default: false
    }
  },
  emits: ['input'],
  data() {
    return {
      sliderWidth: 0,
      objectPosition: 0,
      startOffset: 0,
      currentValue: Math.max(this.min, this.value).toString()
    };
  },
  computed: {
    inputValueValid: {
      get() {
        return this.currentValue
      },
      set(newValue) {
        if (newValue < this.min) {
          this.currentValue = this.min.toString()
        } else if (newValue > this.max) {
          this.currentValue = this.max.toString()
        } else if (!newValue) {
          this.currentValue = this.min.toString()
        } else {
          this.currentValue = (newValue - (this.forceStep ? newValue % this.step : 0)).toString()
        }
      }
    }
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

<style lang="scss" scoped>
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
  border-radius: 2px;
  height: 4px;
  background:  linear-gradient(
      to right,
      var(--color-brand),
      var(--color-brand) calc((var(--current-value) - var(--min-value)) / (var(--max-value) - var(--min-value)) * 100%),
      #c2c2c2 calc((var(--current-value) - var(--min-value)) / (var(--max-value) - var(--min-value)) * 100%),
      #c2c2c2 100%
  );
  background-size: 100% 100%;
  outline: none;
  vertical-align: middle;
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

.slider-component .slide-container .slider:hover::-moz-range-thumb {
  width: 24px;
  height: 24px;
  transition: .2s;
}

.slider-input {
  width: 100px;
  margin-right: 10px;
}
</style>
