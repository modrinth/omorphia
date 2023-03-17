<template>
    <div class="demo"><slot /></div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.demo {
  border: 1px solid var(--color-button-bg);
  display: flex;
  gap: var(--gap-md);
  align-items: center;
  flex-wrap: wrap;
  background: var(--color-raised-bg);
  border-radius: var(--radius-lg);
  padding: var(--gap-md);
}
</style>
