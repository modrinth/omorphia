<script setup>
import {
  Button,
  Modal,
  ClipboardCopyIcon,
  Avatar,
  LinkIcon,
  SendIcon,
  GlobeIcon,
  TwitterIcon,
  MastodonIcon,
  RedditIcon,
} from '@/components'
import { computed, ref } from 'vue'

const props = defineProps({
  header: {
    type: String,
    default: 'Share',
  },
  shareTitle: {
    type: String,
    default: 'Modrinth',
  },
  shareText: {
    type: String,
    default: 'Share',
  },
  link: {
    type: Boolean,
    default: false,
  },
})

const shareModal = ref(null)

const qrCode = ref(null)
const qrImage = ref(null)
const content = ref(null)

const show = async (passedContent) => {
  content.value = passedContent
  if (props.link) {
    const url =
      'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' +
      encodeURIComponent(passedContent)
    fetch(url).then(async (response) => {
      qrImage.value = await response.blob()
      qrCode.value = response.url
    })
  }
  shareModal.value.show()
}

const copyImage = async () => {
  const item = new ClipboardItem({ 'image/png': qrImage.value })
  await navigator.clipboard.write([item])
}

const copyText = async () => {
  await navigator.clipboard.writeText(content.value)
}

const sendEmail = computed(
  () =>
    `mailto:user@test.com
    ?subject=${encodeURIComponent(props.shareTitle)}
    &body=` + encodeURIComponent(`${props.shareText}\n${content.value}`)
)

const sendTweet = computed(
  () =>
    `https://twitter.com/intent/tweet?text=` +
    encodeURIComponent(`${props.shareText}\n${content.value}`)
)

const sendToot = computed(
  () =>
    `https://mastodon.social/share?text=` +
    encodeURIComponent(`${props.shareText}\n${content.value}`)
)

const postOnReddit = computed(
  () =>
    `https://www.reddit.com/submit?title=${encodeURIComponent(props.shareTitle)}&url=` +
    encodeURIComponent(`${props.shareText}\n${content.value}`)
)

defineExpose({
  show,
})
</script>

<template>
  <Modal ref="shareModal" :header="header">
    <div class="share-body">
      <div v-if="link" class="qr-wrapper">
        <Avatar :src="qrCode" alt="QR Code" class="qr-code" size="md" />
        <Button icon-only @click="copyImage" class="copy-button" v-tooltip="'Copy QR code'">
          <ClipboardCopyIcon />
        </Button>
      </div>
      <div class="all-buttons">
        <div v-if="link" class="iconified-input">
          <LinkIcon />
          <input type="text" :value="content" readonly disabled />
          <Button v-tooltip="'Copy Text'" @click="copyText">
            <ClipboardCopyIcon />
          </Button>
        </div>
        <div v-else class="resizable-textarea-wrapper">
          <textarea v-model="content" />
        </div>
        <div class="button-row">
          <Button v-if="!link" v-tooltip="'Copy Text'" icon-only @click="copyText">
            <ClipboardCopyIcon />
          </Button>
          <a v-tooltip="'Send as an email'" class="btn icon-only" target="_blank" :href="sendEmail">
            <SendIcon />
          </a>
          <a
            v-if="link"
            v-tooltip="'Open link in browser'"
            class="btn icon-only"
            target="_blank"
            :href="content"
          >
            <GlobeIcon />
          </a>
          <a v-tooltip="'Toot about it'" class="btn icon-only" target="_blank" :href="sendToot">
            <MastodonIcon />
          </a>
          <a v-tooltip="'Tweet about it'" class="btn icon-only" target="_blank" :href="sendTweet">
            <TwitterIcon />
          </a>
          <a
            v-tooltip="'Share on Reddit'"
            class="btn icon-only"
            target="_blank"
            :href="postOnReddit"
          >
            <RedditIcon />
          </a>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.share-body {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--gap-lg);
  padding: var(--gap-xl);
}

.all-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
}

.iconified-input {
  width: 100%;

  input {
    flex-basis: auto;
  }
}

.button-row {
  display: flex;
  flex-direction: row;
  gap: var(--gap-sm);

  .btn {
    fill: var(--color-contrast);
    color: var(--color-contrast);
  }
}

.qr-wrapper {
  position: relative;

  &:hover {
    .copy-button {
      opacity: 1;
    }
  }
}

.qr-code {
  --size: 5rem;
  padding: var(--gap-sm);
  background-color: white !important;
}

.copy-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: var(--gap-sm);
  transition: all 0.2s ease-in-out;
  opacity: 0;
}

.resizable-textarea-wrapper {
  margin-bottom: calc(-14px + var(--gap-sm));
  height: 100%;

  textarea {
    width: 100%;
    margin: 0;
  }
}
</style>
