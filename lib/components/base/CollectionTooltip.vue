<script setup>
import { Hoverable, Avatar, Card } from '@'
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
  role: {
    type: String,
    default: '',
  },
  projects: {
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
          <div class="user-tooltip-header-text">
            <div class="user-tooltip-header-text-username">{{ name }}</div>
            <div class="projects">
              <div class="icons">
                <Avatar
                  v-for="member in [...props.projects].splice(0, 5)"
                  v-tooltip="member.name"
                  :key="member.name"
                  :src="member.icon"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="user-tooltip-header-text">
          <div class="markdown-body user-tooltip-bio">
            <p>
              {{ bio }}
            </p>
          </div>
          <slot name="button" />
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
    gap: var(--gap-md);

    :deep(.avatar) {
      --size: 4rem;
    }
  }

  .user-tooltip-header-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--gap-xs);
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
}

.projects {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--gap-sm);

  .icons {
    display: flex;
    flex-direction: row;

    :deep(.avatar) {
      --size: 2rem !important;
    }

    .avatar:not(:first-child) {
      margin-left: -0.5rem;
    }
  }
}
</style>
