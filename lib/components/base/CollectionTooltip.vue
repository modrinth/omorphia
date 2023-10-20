<script setup>
import { Hoverable, Avatar, Card } from '@'
const props = defineProps({
  iconUrl: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  projects: {
    type: Array,
    default() {
      return []
    },
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
          <RouterLink :to="`collection/${id}`" class="button-base">
            <Avatar :src="iconUrl" />
          </RouterLink>
          <div class="user-tooltip-header-text">
            <RouterLink
              class="user-tooltip-header-text-username button-base"
              :to="`collection/${id}`"
            >
              {{ name }}
            </RouterLink>
            <div class="projects">
              <div class="icons">
                <Avatar
                  v-for="project in [...props.projects].splice(0, 5)"
                  :key="project.title"
                  v-tooltip="project.title"
                  :src="project.icon_url"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="markdown-body user-tooltip-bio">
          <p>
            {{ description }}
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
      --size: 1.75rem !important;
    }

    .avatar:not(:first-child) {
      margin-left: -0.5rem;
    }
  }
}
</style>
