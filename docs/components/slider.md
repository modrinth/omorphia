# Slider

<script setup>
import { ref } from "vue"; 

const value = ref(0);

const disabled = ref(true);
const testValue1 = ref(2000);
const testValue2 = ref(2000);
const placeholder = ref(3000);
</script>

<DemoContainer>
  Sliders disabled: <input v-model="disabled" type="checkbox" />
  <Slider v-model="value" :min="1000" :max="10000" :step="1000"/>
  <Slider v-model="testValue1" :disabled="disabled" :min="1000" :max="10000" :step="1000" />
  <Slider v-model="testValue2" :disabled="disabled" :placeholder="placeholder" :min="1000" :max="10000" :step="1000" />
</DemoContainer>

```vue
<script setup>
import { ref } from "vue";

const value = ref(0);
const testValue1 = ref(2000);
const testValue2 = ref(2000);
const placeholder = ref(3000);
</script>

<Slider v-model="value" :min="1000" :max="10000" :step="1000"/>
<Slider v-model="testValue1" :disabled="disabled" :min="1000" :max="10000" :step="1000" />
<Slider v-model="testValue2" :disabled="disabled" :placeholder="placeholder" :min="1000" :max="10000" :step="1000" />
```

### Disabling & Placeholders
When a Slider's `disabled` prop is set to true, the slider will be locked. While a Slider is `disabled`, the component can accept a `placeholder` prop.

If the `placeholder` prop is set while the Slider is `disabled`, the Slider will display that value instead of whatever was passed into `v-model`. 

If the `placeholder` prop is set while the Slider is **not** `disabled`, the `placeholder` prop will have no effect.