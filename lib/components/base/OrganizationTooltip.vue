<script setup>
import { Hoverable, Avatar, Card, Badge } from '@'
const props = defineProps({
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
})
</script>

<template>
  <Hoverable>
    <slot />
    <template #popup>
      <Card class="user-tooltip">
        <div class="user-tooltip-header">
          <Avatar :src="icon" />
          <slot name="button" />
        </div>
        <div class="user-tooltip-header-text">
          <div class="user-tooltip-header-text-username">{{ name }}</div>
          <Badge type="organization" />
          <div class="markdown-body user-tooltip-bio">
            <p>
              {{ bio }}
            </p>
          </div>
          <div class="members">
            <div class="icons">
              <Avatar
                v-for="member in [...props.members].splice(0, 5)"
                v-tooltip="member.name"
                :key="member.name"
                :src="member.icon"
                circle
              />
              <div v-if="members.length > 5" class="avatar overflow">+{{ members.length - 5 }}</div>
            </div>
          </div>
          <div class="user-tooltip-stats">
            <div v-for="stat in stats" :key="stat.label" class="user-tooltip-stats-item">
              <div class="user-tooltip-stats-item-value">{{ stat.value }}</div>
              <div class="user-tooltip-stats-item-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
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
    align-items: center;
    justify-content: space-between;
    gap: var(--gap-xl);
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

  .user-tooltip-bio {
    margin: var(--gap-sm) 0;
  }
}

.members {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--gap-sm);
  margin-bottom: var(--gap-md);

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
