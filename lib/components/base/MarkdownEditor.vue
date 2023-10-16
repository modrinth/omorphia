<template>
  <Modal ref="linkModal" header="Insert link">
    <div class="modal-insert">
      <label class="label" for="insert-link-label">
        <span class="label__title">Label</span>
      </label>
      <div class="iconified-input">
        <AlignLeftIcon />
        <input id="insert-link-label" v-model="linkText" type="text" placeholder="Enter label..." />
        <Button @click="() => (linkText = '')">
          <XIcon />
        </Button>
      </div>
      <label class="label" for="insert-link-url">
        <span class="label__title">URL<span class="required">*</span></span>
      </label>
      <div class="iconified-input">
        <LinkIcon />
        <input
          id="insert-link-url"
          v-model="linkUrl"
          type="text"
          placeholder="Enter the link's URL..."
        />
        <Button @click="() => (linkUrl = '')">
          <XIcon />
        </Button>
      </div>
      <span class="label">
        <span class="label__title">Preview</span>
        <span class="label__description"></span>
      </span>
      <div
        style="width: 100%"
        class="markdown-body"
        v-html="renderHighlightedString(linkMarkdown)"
      />
      <div class="input-group push-right">
        <Button :action="() => linkModal.hide()"><XIcon /> Cancel</Button>
        <Button
          color="primary"
          :action="
            () => {
              accessEditor().insert(linkMarkdown)
              linkModal.hide()
            }
          "
          ><PlusIcon /> Insert</Button
        >
      </div>
    </div>
  </Modal>
  <Modal ref="imageModal" header="Insert image">
    <div class="modal-insert">
      <label class="label" for="insert-image-alt">
        <span class="label__title">Description (alt text)<span class="required">*</span></span>
        <span class="label__description">
          Describe the image completely as you would to someone who could not see the image.
        </span>
      </label>
      <div class="iconified-input">
        <AlignLeftIcon />
        <input
          id="insert-image-alt"
          v-model="imageAlt"
          type="text"
          placeholder="Describe the image..."
        />
        <Button @click="() => (imageAlt = '')">
          <XIcon />
        </Button>
      </div>
      <label class="label" for="insert-link-url">
        <span class="label__title">URL<span class="required">*</span></span>
      </label>
      <div class="iconified-input">
        <ImageIcon />
        <input
          id="insert-link-url"
          v-model="imageUrl"
          type="text"
          placeholder="Enter the image URL..."
        />
        <Button @click="() => (imageUrl = '')">
          <XIcon />
        </Button>
      </div>
      <span class="label">
        <span class="label__title">Preview</span>
        <span class="label__description"></span>
      </span>
      <div
        style="width: 100%"
        class="markdown-body"
        v-html="renderHighlightedString(imageMarkdown)"
      />
      <div class="input-group push-right">
        <Button :action="() => imageModal.hide()"><XIcon /> Cancel</Button>
        <Button
          color="primary"
          :action="
            () => {
              accessEditor().insert(imageMarkdown)
              imageModal.hide()
            }
          "
        >
          <PlusIcon /> Insert
        </Button>
      </div>
    </div>
  </Modal>
  <Modal ref="videoModal" header="Insert YouTube video">
    <div class="modal-insert">
      <label class="label" for="insert-video-url">
        <span class="label__title">YouTube video URL<span class="required">*</span></span>
        <span class="label__description"> Enter a valid link to a YouTube video. </span>
      </label>
      <div class="iconified-input">
        <YouTubeIcon />
        <input
          id="insert-video-url"
          v-model="videoUrl"
          type="text"
          placeholder="Enter YouTube video URL"
        />
        <Button @click="() => (videoUrl = '')">
          <XIcon />
        </Button>
      </div>
      <span class="label">
        <span class="label__title">Preview</span>
        <span class="label__description"></span>
      </span>
      <div
        style="width: 100%"
        class="markdown-body"
        v-html="renderHighlightedString(videoMarkdown)"
      />
      <div class="input-group push-right">
        <Button :action="() => videoModal.hide()"><XIcon /> Cancel</Button>
        <Button
          color="primary"
          :action="
            () => {
              accessEditor().insert(videoMarkdown)
              videoModal.hide()
            }
          "
        >
          <PlusIcon /> Insert
        </Button>
      </div>
    </div>
  </Modal>
  <div class="resizable-textarea-wrapper">
    <div class="editor-action-row">
      <div class="editor-actions">
        <template
          v-for="(buttonGroup, _i) in Object.values(BUTTONS).filter((bg) => bg.display)"
          :key="_i"
        >
          <div class="divider"></div>
          <template v-for="button in buttonGroup.buttons" :key="button.label">
            <Button
              v-tooltip="button.label"
              icon-only
              :aria-label="button.label"
              :class="{ 'mobile-hidden-group': !!buttonGroup.hideOnMobile }"
              :action="button.action"
              :disabled="previewMode || disabled"
            >
              <component :is="button.icon" />
            </Button>
          </template>
        </template>
      </div>
      <div class="preview">
        <Toggle id="preview" v-model="previewMode" />
        <label class="label" for="preview"> Preview </label>
      </div>
    </div>
    <textarea
      id="project-description"
      ref="editorInput"
      v-model="currentValue"
      :disabled="disabled"
      :class="{ hide: previewMode }"
      @input="() => onInput()"
      @keydown="(event) => onKeyDown(event)"
    />
    <div v-if="!previewMode" class="info-blurb">
      <InfoIcon />
      <span>
        This editor supports
        <a href="https://docs.modrinth.com/docs/markdown" target="_blank">Markdown formatting</a>.
      </span>
    </div>
    <div
      v-if="previewMode"
      style="width: 100%"
      class="markdown-body"
      v-html="renderHighlightedString(currentValue ?? '')"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { renderHighlightedString } from '@/helpers/highlight.js'
import { createEditor } from '@/helpers/editor.js'
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  CodeIcon,
  ListBulletedIcon,
  ListOrderedIcon,
  TextQuoteIcon,
  LinkIcon,
  ImageIcon,
  YouTubeIcon,
  Button,
  Modal,
  Toggle,
} from '@/components'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  headingButtons: {
    type: Boolean,
    default: true,
  },
})

const COMMANDS = {
  CTRL: {
    SHIFT: {
      '*': () => accessEditor().mark('-').focus().togglePrefix().run(),
      '&': () => accessEditor().mark('1.').focus().togglePrefix().run(),
      '>': () => accessEditor().mark('>').focus().togglePrefix().run(),
    },
    ALT: {
      1: () => accessEditor().mark('#').focus().togglePrefix().run(),
      2: () => accessEditor().mark('#', 2).focus().togglePrefix().run(),
      3: () => accessEditor().mark('#', 3).focus().togglePrefix().run(),
      4: () => accessEditor().mark('#', 4).focus().togglePrefix().run(),
    },
    b: () => accessEditor().mark('*', 2).focus().toggleSurround().run(),
    i: () => accessEditor().mark('*').focus().toggleSurround().run(),
    k: () => openLinkModal(),
  },
  ALT: {
    SHIFT: {
      '%': () => accessEditor().mark('~', 2).focus().toggleSurround().run(),
    },
  },
}

const BUTTONS = {
  headings: {
    display: props.headingButtons,
    hideOnMobile: true,
    buttons: [
      {
        label: 'Heading 1',
        icon: Heading1Icon,
        action: () => accessEditor().mark('#').focus().togglePrefix().run(),
      },
      {
        label: 'Heading 2',
        icon: Heading2Icon,
        action: () => accessEditor().mark('#', 2).focus().togglePrefix().run(),
      },
      {
        label: 'Heading 3',
        icon: Heading3Icon,
        action: () => accessEditor().mark('#', 3).focus().togglePrefix().run(),
      },
    ],
  },
  modifiers: {
    display: true,
    buttons: [
      {
        label: 'Bold',
        icon: BoldIcon,
        action: () => accessEditor().mark('*', 2).focus().toggleSurround().run(),
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        action: () => accessEditor().mark('*').focus().toggleSurround().run(),
      },
      {
        label: 'Strikethrough',
        icon: StrikethroughIcon,
        action: () => accessEditor().mark('~', 2).focus().toggleSurround().run(),
      },
      {
        label: 'Codeblock',
        icon: CodeIcon,
        action: () => accessEditor().mark('`', 3).focus().setSurroundingLines().run(),
      },
    ],
  },
  multiline: {
    display: true,
    hideOnMobile: true,
    buttons: [
      {
        label: 'Unordered list',
        icon: ListBulletedIcon,
        action: () => accessEditor().mark('-').focus().togglePrefix().run(),
      },
      {
        label: 'Numbered list',
        icon: ListOrderedIcon,
        action: () => accessEditor().mark('1.').focus().togglePrefix().run(),
      },
      {
        label: 'Blockquote',
        icon: TextQuoteIcon,
        action: () => accessEditor().mark('>').focus().togglePrefix().run(),
      },
    ],
  },
  components: {
    display: true,
    buttons: [
      {
        label: 'Link',
        icon: LinkIcon,
        action: () => openLinkModal(),
      },
      {
        label: 'Image',
        icon: ImageIcon,
        action: () => openImageModal(),
      },
      {
        label: 'Video',
        icon: YouTubeIcon,
        action: () => openVideoModal(),
      },
    ],
  },
}

const currentValue = ref(props.modelValue)
const previewMode = ref(false)
/** @type {import('vue').Ref<HTMLTextAreaElement | null>} */
const editorInput = ref(null)

const linkText = ref('')
const linkUrl = ref('')

/**
 * @ Note: This does not clean the URL, it just makes sure http urls and domains are given https protocol
 * @param {string} input The URL to clean
 * @returns {string} The cleaned URL
 */
function cleanUrl(input) {
  // TODO: Validate urls against zod or browser URL object
  if (input.startsWith('http://')) {
    return input.replace('http://', 'https://')
  }
  if (!input.startsWith('https://')) {
    input = 'https://' + input
  }
  return input
}

const linkMarkdown = computed(() => {
  if (!linkUrl.value || !linkUrl.value.includes('.')) {
    return ''
  }
  const url = cleanUrl(linkUrl.value)
  return url ? `[${linkText.value ? linkText.value : url}](${url})` : ''
})

const imageAlt = ref('')
const imageUrl = ref('')

const imageMarkdown = computed(() => {
  const url = cleanUrl(imageUrl.value)
  return url ? `![${imageAlt.value}](${url})` : ''
})

const videoUrl = ref('')
const youtubeRegex =
  /^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]{7,15})(?:[?&][a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*$/

const videoMarkdown = computed(() => {
  const match = youtubeRegex.exec(videoUrl.value)
  if (match) {
    return `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${match[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  } else {
    return ''
  }
})

const linkModal = ref(null)
const imageModal = ref(null)
const videoModal = ref(null)

const onInput = () => {
  emit('update:modelValue', currentValue.value)
}

const onKeyDown = (event) => {
  let command

  if ((navigator.userAgent.includes('Mac') && event.metaKey) || event.ctrlKey) {
    if (event.shiftKey) {
      command = COMMANDS.CTRL.SHIFT?.[event.key]
    } else if (event.altKey) {
      command = COMMANDS.CTRL.ALT?.[event.key]
    } else {
      command = COMMANDS.CTRL?.[event.key]
    }
  } else if (event.altKey && event.shiftKey) {
    command = COMMANDS.ALT.SHIFT?.[event.key]
  }

  if (command) {
    // Prevent the default action to prevent the browser from inserting the character
    event.preventDefault()
    command()
  }
}

/**
 * @returns {ReturnType<typeof createEditor> | undefined} The editor object to chain commands
 */
const accessEditor = () => {
  // Editor is our constant reference so we don't really need to check if it exists
  // but just in case we do, the type is added manually bc javascript is weird
  return createEditor(editorInput, (str) => {
    currentValue.value = str
  })
}

function openLinkModal() {
  linkText.value = accessEditor().getSelection()
  linkUrl.value = ''
  linkModal.value.show()
}

function openImageModal() {
  imageAlt.value = ''
  imageUrl.value = ''
  imageModal.value.show()
}

function openVideoModal() {
  videoUrl.value = ''
  videoModal.value.show()
}
</script>

<style scoped>
.display-options {
  margin-bottom: var(--gap-sm);
}

.editor-action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--gap-sm);
  gap: var(--gap-xs);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
  }
}

.editor-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--gap-xs);

  @media (max-width: 768px) {
    .divider {
      display: none;
    }

    .mobile-hidden-group {
      display: none;
    }
  }

  .divider {
    width: 0.125rem;
    height: 1.8rem;
    background-color: var(--color-button-bg);
    border-radius: var(--radius-max);
    margin-inline: var(--gap-xs);
  }

  .divider:first-child {
    display: none;
  }
}

.resizable-textarea-wrapper textarea {
  min-height: 10rem;
  width: 100%;
}

.info-blurb {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
}

.hide {
  display: none;
}

.preview {
  display: flex;
  align-items: center;
  justify-items: end;
  gap: var(--gap-xs);
}

.markdown-body {
  border: 1px solid var(--color-button-bg);
  border-radius: var(--radius-md);
  padding: var(--radius-md);
  min-height: 6rem;
}

.modal-insert {
  padding: var(--gap-lg);

  .iconified-input {
    width: 100%;
  }

  .label {
    margin-block: var(--gap-lg) var(--gap-sm);
    display: block;
  }

  .label__title {
    color: var(--color-contrast);
    display: block;
    font-size: 1.17rem;
    font-weight: 700;

    .required {
      color: var(--color-red);
    }
  }

  .input-group {
    margin-top: var(--gap-lg);
  }
}
</style>
