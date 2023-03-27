<template>
  <span :class="'version-badge ' + color + ' type--' + type">
    <template v-if="color"> <span class="circle" /> {{ type }} </template>

    <!-- User roles -->
    <template v-else-if="type === 'admin'"> <ModrinthIcon /> Modrinth Team </template>
    <template v-else-if="type === 'moderator'"> <ScaleIcon /> Moderator </template>
    <template v-else-if="type === 'creator'"><BoxIcon /> Creator</template>

    <!-- Project statuses -->
    <template v-else-if="type === 'approved'">
      <span v-tooltip="'Your project is visible in search and on your profile.'">
        <ListIcon /> Listed
      </span>
    </template>
    <template v-else-if="type === 'unlisted'">
      <span
        v-tooltip="
          'Your project is published, and can be accessed with a link, but cannot be seen in search or on your profile.'
        "
      >
        <EyeOffIcon /> Unlisted
      </span>
    </template>
    <template v-else-if="type === 'withheld'">
      <span
        v-tooltip="
          'Your project is accessible by link but is not published in search. See the moderation message for more details.'
        "
      >
        <EyeOffIcon /> Withheld
      </span>
    </template>
    <template v-else-if="type === 'private'">
      <span v-tooltip="'Your project is only visible to members of your team.'">
        <LockIcon /> Private
      </span>
    </template>
    <template v-else-if="type === 'scheduled'">
      <span
        v-tooltip="'Your project will be automatically published at your chosen time and date.'"
      >
        <CalendarIcon /> Scheduled
      </span>
    </template>
    <template v-else-if="type === 'draft'">
      <span
        v-tooltip="
          'Your project cannot be found in search or your profile until you submit it for review.'
        "
        ><FileTextIcon /> Draft
      </span>
    </template>
    <template v-else-if="type === 'archived'">
      <span
        v-tooltip="
          'Your project is visible in search, and will display a archival notice to visitors.'
        "
      >
        <ArchiveIcon /> Archived
      </span>
    </template>
    <template v-else-if="type === 'rejected'">
      <span
        v-tooltip="'Your project cannot be published. See the moderation message for more details.'"
        ><XIcon /> Rejected</span
      >
    </template>
    <template v-else-if="type === 'processing'">
      <span v-tooltip="'A moderator will need to review your project before it is published.'"
        ><ProcessingIcon /> Under review</span
      >
    </template>

    <!-- Team members -->
    <template v-else-if="type === 'accepted'"><CheckIcon /> Accepted</template>
    <template v-else-if="type === 'pending'"> <UpdatedIcon /> Pending </template>
    <template v-else> <span class="circle" /> {{ type }} </template>
  </span>
</template>

<script setup>
import {
  ModrinthIcon,
  ScaleIcon,
  BoxIcon,
  ListIcon,
  EyeOffIcon,
  FileTextIcon,
  XIcon,
  ArchiveIcon,
  UpdatedIcon,
  CheckIcon,
  LockIcon,
  CalendarIcon,
} from '@/components'

defineProps({
  type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.version-badge {
  display: flex;
  align-items: center;
  font-weight: bold;
  width: fit-content;
  --badge-color: var(--color-gray);
  color: var(--badge-color);

  .circle {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.25rem;
    background-color: var(--badge-color);
  }

  svg {
    margin-right: 0.25rem;
  }

  &.type--withheld,
  &.type--rejected,
  &.red {
    --badge-color: var(--color-red);
  }

  &.type--pending,
  &.type--moderator,
  &.type--processing,
  &.type--scheduled,
  &.orange {
    --badge-color: var(--color-orange);
  }

  &.type--accepted,
  &.type--admin,
  &.green {
    --badge-color: var(--color-green);
  }

  &.type--creator,
  &.type--approved,
  &.blue {
    color: var(--color-blue);
  }

  &.type--unlisted,
  &.purple {
    color: var(--color-purple);
  }

  &.type--private,
  &.gray {
    --badge-color: var(--color-gray);
  }

  &::first-letter {
    text-transform: capitalize;
  }
}
</style>
