<template>
  <Button :action="showModal">Show Modal</Button>
  <ModalReport
    ref="reportModal"
    :reportTypes="['cringitude', 'rudeness', 'notgamer', 'windowsuser']"
  >
  </ModalReport>
</template>

<script setup>
import { ModalReport, Button } from '@/components'
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    showModal() {
      this.$refs.reportModal.modal.show()
    },
  },
})
</script>

<style scoped lang="scss"></style>
