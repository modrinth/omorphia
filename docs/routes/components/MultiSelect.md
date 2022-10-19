### Default option example

```svelte example raised
<script lang="ts">
	import { MultiSelect } from 'omorphia'

	let filter = []
</script>

<MultiSelect
	options={[
		{ value: 'fabric', label: 'Fabric', selected: false },
		{ value: 'forge', label: 'Forge', selected: false },
		{ value: 'lite', label: 'Liteloader', selected: false },
		{ value: 'risu', label: "Risugami's Modloader", selected: false },
		{ value: 'quilt', label: 'Quilt', selected: false },
		{ value: 'rift', label: 'Rift', selected: false },
	]}
	bind:value={filter}
	label="Modloader" />
```

### Icon example

```svelte example raised
<script lang="ts">
	import { MultiSelect } from 'omorphia'
	import IconCube from 'virtual:icons/heroicons-outline/cube'
</script>

<MultiSelect
	options={[
		{ value: 'client', label: 'Client' },
		{ value: 'server', label: 'Server' },
	]}
	label="Environment"
	icon={IconCube} />
```
