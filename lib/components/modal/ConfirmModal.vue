<template>
  <Modal ref="modal" :header="title" :noblur="noblur">
    <div class="modal-delete">
      <div class="markdown-body" v-html="renderString(description)" />
      <label v-if="hasToType" for="confirmation" class="confirmation-label">
        <span>
          <strong>To verify, type</strong>
          <em class="confirmation-text">{{ confirmationText }}</em>
          <strong>below:</strong>
        </span>
      </label>
      <div class="confirmation-input">
        <input
          v-if="hasToType"
          id="confirmation"
          v-model="confirmation_typed"
          type="text"
          placeholder="Type here..."
          @input="type"
        />
      </div>
      <div class="input-group push-right">
        <button class="btn" @click="modal.hide()">
          <XIcon />
          Cancel
        </button>
        <button class="btn btn-danger" :disabled="action_disabled" @click="proceed">
          <TrashIcon />
          {{ proceedLabel }}
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { Modal, TrashIcon, XIcon, renderString } from '@'
import { ref, VNodeRef } from 'vue'

const props = withDefaults(
  defineProps<{
    confirmationText: string
    hasToType: boolean
    title: string
    description: string
    proceedLabel: string
    noblur: boolean
  }>(),
  {
    confirmationText: '',
    hasToType: false,
    title: 'No title defined',
    description: 'No description defined',
    proceedLabel: 'Proceed',
    noblur: false,
  }
)

const emit = defineEmits(['proceed'])
const modal = ref<VNodeRef | null>(null)

const action_disabled = ref(props.hasToType)
const confirmation_typed = ref('')

function proceed() {
  modal.value.hide()
  emit('proceed')
}

function type() {
  if (props.hasToType) {
    action_disabled.value =
      confirmation_typed.value.toLowerCase() !== props.confirmationText.toLowerCase()
  }
}

function show() {
  modal.value.show()
}

defineExpose({ show })
</script>

<style scoped lang="scss">
.modal-delete {
  padding: var(--gap-lg);
  display: flex;
  flex-direction: column;

  .markdown-body {
    margin-bottom: 1rem;
  }

  .confirmation-label {
    margin-bottom: 0.5rem;
  }

  .confirmation-text {
    padding-right: 0.25ch;
    margin: 0 0.25rem;
  }

  .confirmation-input {
    input {
      width: 20rem;
      max-width: 100%;
    }
  }

  .button-group {
    margin-left: auto;
    margin-top: 1.5rem;
  }
}
</style>
