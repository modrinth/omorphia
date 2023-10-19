<script setup>
import { Hoverable, Avatar, Card } from '@'

defineProps({
  icon: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  stats: {
    type: Array,
    default() {
      return []
    },
  },
  projectType: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <Hoverable>
    <slot />
    <template #popup>
      <Card class="user-tooltip">
        <div class="banner" />
        <div class="user-tooltip-header">
          <Avatar :src="icon" />
          <div class="user-tooltip-header-text">
            <div class="user-tooltip-header-text-username">{{ name }}</div>
            <div class="user-tooltip-stats">
              <div v-for="stat in stats" :key="stat.label" class="user-tooltip-stats-item">
                <div class="user-tooltip-stats-item-value">{{ stat.value }}</div>
                <div class="user-tooltip-stats-item-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="markdown-body user-tooltip-bio">
          <p>
            {{ bio }}
          </p>
        </div>
        <slot name="button" />
      </Card>
    </template>
  </Hoverable>
</template>

<style scoped lang="scss">
.user-tooltip {
  display: flex;
  flex-direction: column;
  padding: var(--gap-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-button-bg);
  width: 20rem;
  gap: var(--gap-sm);

  .user-tooltip-header {
    display: flex;
    gap: var(--gap-md);

    :deep(.avatar) {
      --size: 4rem;
    }
  }

  .user-tooltip-header-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    .user-tooltip-header-text-username {
      font-weight: bolder;
      font-size: var(--font-size-md);
      color: var(--color-contrast);
    }
  }

  .user-tooltip-stats {
    display: flex;
    width: 100%;
    gap: var(--gap-sm);
    font-size: var(--font-size-sm);

    .user-tooltip-stats-item {
      display: flex;
      align-items: center;
      gap: var(--gap-xs);

      .user-tooltip-stats-item-value {
        font-weight: 600;
        color: var(--color-contrast);
      }
    }
  }

  .banner {
    width: calc(100% + 1.5rem);
    height: 6rem;
    background-color: var(--color-button-bg);
    background-image: url('https://wsrv.nl/?url=https%3A%2F%2Fwww.bisecthosting.com%2Fimages%2FCF%2FSpirit%2FBH_NU_HEADER.png&n=-1');
    background-size: cover;
    background-position: center;
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    margin: -0.75rem -0.75rem var(--gap-xs) -0.75rem;
  }
}
</style>
