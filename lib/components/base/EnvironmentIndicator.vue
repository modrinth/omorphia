<template>
  <span v-if="typeOnly" class="environment">
    <InfoIcon aria-hidden="true" />
    A {{ type }}
  </span>
  <span
    v-else-if="
      !['resourcepack', 'shader'].includes(type) &&
      !(type === 'plugin' && search) &&
      !categories.includes('datapack')
    "
    class="environment"
  >
    <template v-if="clientSide === 'optional' && serverSide === 'optional'">
      <GlobeIcon aria-hidden="true" />
      Client or server
    </template>
    <template v-else-if="clientSide === 'required' && serverSide === 'required'">
      <GlobeIcon aria-hidden="true" />
      Client and server
    </template>
    <template
      v-else-if="
        (clientSide === 'optional' || clientSide === 'required') &&
        (serverSide === 'optional' || serverSide === 'unsupported')
      "
    >
      <ClientIcon aria-hidden="true" />
      Client
    </template>
    <template
      v-else-if="
        (serverSide === 'optional' || serverSide === 'required') &&
        (clientSide === 'optional' || clientSide === 'unsupported')
      "
    >
      <ServerIcon aria-hidden="true" />
      Server
    </template>
    <template v-else-if="serverSide === 'unsupported' && clientSide === 'unsupported'">
      <GlobeIcon aria-hidden="true" />
      Unsupported
    </template>
    <template v-else-if="alwaysShow">
      <InfoIcon aria-hidden="true" />
      A {{ type }}
    </template>
  </span>
</template>
<script setup lang="ts">
import { GlobeIcon, ClientIcon, ServerIcon, InfoIcon } from '@'

withDefaults(
  defineProps<{
    type: string
    serverSide?: string
    clientSide?: string
    typeOnly?: boolean
    alwaysShow?: boolean
    search?: boolean
    categories?: Array<string>
  }>(),
  {
    type: 'mod',
    serverSide: '',
    clientSide: '',
    typeOnly: false,
    alwaysShow: false,
    search: false,
    categories: () => [],
  }
)
</script>
<style lang="scss" scoped>
.environment {
  display: flex;
  color: var(--color-text) !important;
  font-weight: bold;
  font-size: 1rem;
  align-items: center;
  svg {
    margin-right: 0.2rem;
  }
}
</style>
