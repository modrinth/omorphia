<script setup>
import { Hoverable, Avatar, Card } from '@'
import { formatNumber } from '@/helpers'

defineProps({
  iconUrl: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  downloads: {
    type: Number,
    default: 0,
  },
  followers: {
    type: Number,
    default: 0,
  },
  projectUrl: {
    type: String,
    default: '',
  },
  position: {
    type: String,
    default: 'bottom',
  },
  direction: {
    type: String,
    default: 'left',
  },
})
</script>

<template>
  <Hoverable :position="position" :direction="direction">
    <slot />
    <template #popup>
      <Card class="user-tooltip">
        <div class="user-tooltip-header">
          <RouterLink :to="projectUrl" class="button-base">
            <Avatar :src="iconUrl" />
          </RouterLink>
          <div class="user-tooltip-header-text">
            <RouterLink class="user-tooltip-header-text-username button-base" :to="projectUrl">
              {{ name }}
            </RouterLink>
            <div v-if="author" class="user-tooltip-header-text-author">
              by
              <RouterLink :to="`/user/${author}`" class="button-base">
                {{ author }}
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="markdown-body user-tooltip-bio">
          <p>
            {{ description }}
          </p>
        </div>
        <div class="user-tooltip-stats">
          <div class="user-tooltip-stats-item">
            <div class="user-tooltip-stats-item-value">{{ formatNumber(downloads) }}</div>
            <div class="user-tooltip-stats-item-label">Downloads</div>
          </div>
          <div class="user-tooltip-stats-item">
            <div class="user-tooltip-stats-item-value">{{ formatNumber(followers) }}</div>
            <div class="user-tooltip-stats-item-label">Followers</div>
          </div>
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
  gap: var(--gap-md);

  :deep(.avatar) {
    min-width: var(--size);
    min-height: var(--size);
  }

  .user-tooltip-header {
    display: flex;
    gap: var(--gap-md);

    .avatar {
      border: 1px solid var(--color-button-bg);
    }

    :deep(.avatar) {
      --size: 3.5rem !important;
    }

    .user-tooltip-header-text-author {
      .button-base {
        text-decoration: underline;
      }
    }
  }

  .user-tooltip-header-text {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .user-tooltip-header-text-username {
      width: fit-content;
      font-weight: bolder;
      font-size: var(--font-size-md);
      color: var(--color-contrast);
    }
  }

  .user-tooltip-stats {
    display: flex;
    width: 100%;
    gap: var(--gap-sm);

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
}
</style>
