<script setup>
import { Hoverable, Avatar, Card, Badge } from '@'
import { formatNumber } from '@/helpers'
const props = defineProps({
  iconUrl: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: '',
  },
  members: {
    type: Array,
    default() {
      return []
    },
  },
  projects: {
    type: Number,
    default: 0,
  },
  downloads: {
    type: Number,
    default: 0,
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
          <RouterLink :to="`organization/${name}`" class="button-base">
            <Avatar :src="iconUrl" />
          </RouterLink>
          <div class="user-tooltip-header-text">
            <RouterLink
              class="user-tooltip-header-text-username button-base"
              :to="`organization/${name}`"
            >
              {{ name }}
            </RouterLink>
            <Badge type="organization" />
          </div>
        </div>
        <div class="markdown-body user-tooltip-bio">
          <p>
            {{ description }}
          </p>
        </div>
        <div class="members">
          <div class="icons">
            <RouterLink
              v-for="member in [...props.members].splice(0, 5)"
              :key="member.username"
              :to="`/user/${member.username}`"
              class="button-base avatar"
            >
              <Avatar v-tooltip="member.username" :src="member.icon_url" circle />
            </RouterLink>
            <div v-if="members.length > 5" class="avatar overflow">+{{ members.length - 5 }}</div>
          </div>
        </div>
        <div class="user-tooltip-stats">
          <div class="user-tooltip-stats-item">
            <div class="user-tooltip-stats-item-value">{{ formatNumber(projects) }}</div>
            <div class="user-tooltip-stats-item-label">Projects</div>
          </div>
          <div class="user-tooltip-stats-item">
            <div class="user-tooltip-stats-item-value">{{ formatNumber(downloads) }}</div>
            <div class="user-tooltip-stats-item-label">Downloads</div>
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
    align-items: center;
    gap: var(--gap-md);

    .avatar {
      border: 1px solid var(--color-button-bg);
    }

    :deep(.avatar) {
      --size: 3.5rem !important;
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

.members {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--gap-sm);

  .icons {
    display: flex;
    flex-direction: row;

    .overflow {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-button-bg);
      font-weight: 600;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
    }

    :deep(.avatar) {
      --size: 2rem !important;
    }

    .avatar:not(:first-child) {
      margin-left: -0.5rem;
    }
  }
}
</style>
