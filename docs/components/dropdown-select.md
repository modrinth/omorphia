# Dropdown
<script setup>
import { ref } from "vue";

const value = ref(null)
</script>

<DemoContainer>
  <DropdownSelect
    id="report-type"
    v-model="value"
    :options="['Daily', 'Weekly', 'Monthly', 'Tomorrow', 'Yesterday', 'Today', 'Biweekly', 'Tuesday', 'January']"
    placeholder="Choose Frequency"
  />
  <DropdownSelect
    id="report-type"
    v-model="value"
    :options="['Daily', 'Weekly', 'Monthly', 'Tomorrow', 'Yesterday', 'Today', 'Biweekly', 'Tuesday', 'January']"
    placeholder="Choose Frequency"
    render-up
  />
  <DropdownSelect
    id="report-type"
    v-model="value"
    :options="['Daily', 'Weekly', 'Monthly', 'Tomorrow', 'Yesterday', 'Today', 'Biweekly', 'Tuesday', 'January']"
    placeholder="Choose Frequency"
    disabled
  />
</DemoContainer>

```vue
<DropdownSelect
  id="report-type"
  v-model="value"
  :options="['Daily', 'Weekly', 'Monthly', 'Tomorrow', 'Yesterday', 'Today', 'Biweekly', 'Tuesday', 'January']"
  placeholder="Choose Frequency"
  render-up
  disabled
/>
```
