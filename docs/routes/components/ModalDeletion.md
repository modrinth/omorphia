```svelte example raised
<script lang="ts">
	import { ModalDeletion, Button } from 'omorphia'
</script>

<ModalDeletion
	type="account"
	key="venashial"
	let:trigger
	on:deletion={() => console.log('Do something...')}>
	<Button slot="trigger" color="danger" on:click={trigger}>Delete account</Button>
</ModalDeletion>
```
