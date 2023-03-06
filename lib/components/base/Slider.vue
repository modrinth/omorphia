<template>
  <div class="root-container">
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
        <div class="slider-range">
          <span>
              {{ min }}
            </span>
          <span>
              {{ max }}
            </span>
        </div>
      </div>
    </div>
    <input
      type="text"
      ref="value"
      v-model.lazy="currentValue"
      class="slider-input"
      @change="onTextInput"
    />
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

.slide-container .slider {
  width: 12rem;
}

.slider-component .slide-container {
  width: 100%;
}

.slider-component .slide-container .slider {
  -webkit-appearance: none;
  appearance: none;
  border-radius: var(--radius-sm);
  height: .25rem;
  background:  linear-gradient(
      to right,
      var(--color-brand),
      var(--color-brand) calc((var(--current-value) - var(--min-value)) / (var(--max-value) - var(--min-value)) * 100%),
      var(--color-base) calc((var(--current-value) - var(--min-value)) / (var(--max-value) - var(--min-value)) * 100%),
      var(--color-base) 100%
  );
  background-size: 100% 100%;
  outline: none;
  vertical-align: middle;
}

.slider-component .slide-container .slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: .75rem;
  height: .75rem;
  background: var(--color-brand);
  cursor: pointer;
  border-radius: 50%;
  transition: .2s;
}

.slider-component .slide-container .slider::-moz-range-thumb {
  width: .75rem;
  height: .75rem;
  background: var(--color-brand);
  cursor: pointer;
  border-radius: 50%;
  transition: .2s;
}

.slider-component .slide-container .slider:hover::-webkit-slider-thumb {
  width: 1rem;
  height: 1rem;
  transition: .2s;
}

.slider-component .slide-container .slider:hover::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  transition: .2s;
}

.slider-input {
  width: 6rem;
  margin-left: .75rem;
}

.slider-range {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.75rem;
  margin: 0;
}
</style>
