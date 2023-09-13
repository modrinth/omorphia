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
              insert(linkMarkdown)
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
              insert(imageMarkdown)
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
              insert(videoMarkdown)
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
    <div class="editor-actions">
      <template v-if="headingButtons">
        <Button icon-only :action="() => toggleLines('# ')" :disabled="previewMode || disabled">
          <Heading1Icon />
        </Button>
        <Button icon-only :action="() => toggleLines('## ')" :disabled="previewMode || disabled">
          <Heading2Icon />
        </Button>
        <Button icon-only :action="() => toggleLines('### ')" :disabled="previewMode || disabled">
          <Heading3Icon />
        </Button>
      </template>
      <Button icon-only :action="() => toggleSurround('**')" :disabled="previewMode || disabled">
        <BoldIcon />
      </Button>
      <Button icon-only :action="() => toggleSurround('*')" :disabled="previewMode || disabled">
        <ItalicIcon />
      </Button>
      <Button icon-only :action="() => toggleSurround('~~')" :disabled="previewMode || disabled">
        <StrikethroughIcon />
      </Button>
      <Button
        icon-only
        :action="() => toggleSurroundingLines('```')"
        :disabled="previewMode || disabled"
      >
        <CodeIcon />
      </Button>
      <div class="divider"></div>
      <Button icon-only :action="() => toggleLines('- ')" :disabled="previewMode || disabled">
        <ListBulletedIcon />
      </Button>
      <Button icon-only :action="() => toggleLines('1. ')" :disabled="previewMode || disabled">
        <ListOrderedIcon />
      </Button>
      <Button icon-only :action="() => toggleLines('> ')" :disabled="previewMode || disabled">
        <TextQuoteIcon />
      </Button>
      <div class="divider"></div>
      <Button icon-only :action="() => openLinkModal()" :disabled="previewMode || disabled">
        <LinkIcon />
      </Button>
      <Button icon-only :action="() => openImageModal()" :disabled="previewMode || disabled">
        <ImageIcon />
      </Button>
      <Button icon-only :action="() => openVideoModal()" :disabled="previewMode || disabled">
        <YouTubeIcon />
      </Button>
      <Checkbox v-model="previewMode" description="Preview" class="preview">Preview</Checkbox>
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
import Checkbox from '@/components/base/Checkbox.vue'
import Modal from '@/components/base/Modal.vue'

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

const currentValue = ref(props.modelValue)
const previewMode = ref(false)
const editorInput = ref(null)

const linkText = ref('')
const linkUrl = ref('')

function cleanUrl(url) {
  if (!url.startsWith('https://')) {
    url = 'https://' + url
  }
  return url
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
  if ((navigator.userAgent.includes('Mac') && event.metaKey) || event.ctrlKey) {
    if (event.shiftKey) {
      switch (event.key) {
        case '*':
          toggleLines('- ')
          break
        case '&':
          toggleLines('1. ')
          break
        case '>':
          toggleLines('> ')
          break
      }
    } else if (event.altKey) {
      switch (event.key) {
        case '1':
          toggleLines('# ')
          break
        case '2':
          toggleLines('## ')
          break
        case '3':
          toggleLines('### ')
          break
        case '4':
          toggleLines('#### ')
          break
      }
    } else {
      switch (event.key) {
        case 'b':
          toggleSurround('**')
          break
        case 'i':
          toggleSurround('*')
          break
        case 'k':
          openLinkModal()
          break
      }
    }
  } else if (event.altKey && event.shiftKey && event.key === '%') {
    toggleSurround('~~')
  }
}

const countSurroundingPairs = (str, start, end, symbol) => {
  let count = 0
  if (!str) {
    str = ''
  }
  const length = str.length

  while (start > 0 && end < length) {
    const prefix = str.substring(start - symbol.length, start)
    const suffix = str.substring(end, end + symbol.length)

    if (prefix === symbol && suffix === symbol) {
      count++
      start -= symbol.length
      end += symbol.length
    } else {
      break
    }
  }

  return count
}

function selectLines(str, start, end) {
  const lines = str.split('\n')
  let selectedStart = -1
  let selectedEnd = -1

  for (const line of lines) {
    const lineStart = str.indexOf(line)
    const lineEnd = lineStart + line.length

    // check if the selection intersects with the current line
    const selected = start <= lineEnd && end >= lineStart

    if (selected) {
      if (selectedStart === -1 || lineStart < selectedStart) {
        selectedStart = lineStart
      }
      if (lineEnd > selectedEnd) {
        selectedEnd = lineEnd
      }
    }
  }

  return {
    start: selectedStart,
    end: selectedEnd,
  }
}

function toggleLinePrefix(str, start, end, symbol) {
  const selection = selectLines(str, start, end)
  const selectedLines = str.substring(selection.start, selection.end).split('\n')
  let modifiedLines

  if (selectedLines.every((line) => line.startsWith(symbol))) {
    // remove symbol from all lines
    modifiedLines = selectedLines.map((line) => line.slice(symbol.length))
  } else {
    // add symbol to lines without it
    modifiedLines = selectedLines.map((line) => {
      if (!line.startsWith(symbol)) {
        return symbol + line
      }
      return line
    })
  }

  return {
    newText: modifiedLines.join('\n'),
    newSelection: selection,
  }
}

function trimEmptyStrings(arr) {
  // Trim from the beginning
  while (arr.length > 0 && arr[0] === '') {
    arr.shift()
  }

  // Trim from the end
  while (arr.length > 0 && arr[arr.length - 1] === '') {
    arr.pop()
  }

  return arr
}

function toggleLineSurroundings(str, start, end, symbol) {
  const selection = selectLines(str, start, end)
  const selectedLines = trimEmptyStrings(str.substring(selection.start, selection.end).split('\n'))

  const linesBefore = trimEmptyStrings(str.substring(0, selection.start).split('\n'))
  const linesAfter = trimEmptyStrings(str.substring(selection.end).split('\n'))

  const symbolsBefore = linesBefore.length > 0 && linesBefore[linesBefore.length - 1] === symbol
  const symbolsAfter = linesAfter.length > 0 && linesAfter[0] === symbol

  if (symbolsBefore && symbolsAfter) {
    const expansionLength = symbol.length + '\n'.length
    selection.start -= expansionLength
    selection.end += expansionLength
  } else {
    selectedLines.unshift(symbol)
    selectedLines.push(symbol)
  }

  const joinedSelection = selectedLines.join('\n')

  return {
    newText: joinedSelection,
    newSelection: selection,
  }
}

const toggleLines = (formattingSymbol) => {
  const editorInputElem = editorInput.value
  if (!editorInputElem) {
    return
  }
  editorInputElem.focus()

  const start = editorInputElem.selectionStart
  const end = editorInputElem.selectionEnd

  const { newText, newSelection } = toggleLinePrefix(
    currentValue.value,
    start,
    end,
    formattingSymbol
  )

  editorInputElem.selectionStart = newSelection.start
  editorInputElem.selectionEnd = newSelection.end
  document.execCommand('insertText', false, newText)

  // reset selection to just the text
  const newSelectionDiff = newText.length - (newSelection.end - newSelection.start)
  if (start === end) {
    editorInputElem.selectionStart = start + newSelectionDiff
    editorInputElem.selectionEnd = end + newSelectionDiff
  } else {
    editorInputElem.selectionStart = newSelection.start
    editorInputElem.selectionEnd = newSelection.end + newSelectionDiff
  }
}
const toggleSurroundingLines = (formattingSymbol) => {
  const editorInputElem = editorInput.value
  if (!editorInputElem) {
    return
  }
  editorInputElem.focus()

  const start = editorInputElem.selectionStart
  const end = editorInputElem.selectionEnd

  const { newText, newSelection } = toggleLineSurroundings(
    currentValue.value,
    start,
    end,
    formattingSymbol
  )

  editorInputElem.selectionStart = newSelection.start
  editorInputElem.selectionEnd = newSelection.end
  const beforeLength = currentValue.value.substring(newSelection.start, newSelection.end).length
  document.execCommand('insertText', false, newText)

  // reset selection to just the text
  const symbolLength = formattingSymbol.length + '\n'.length
  if (newText.length > beforeLength) {
    if (start === end) {
      editorInputElem.selectionStart = start + symbolLength
      editorInputElem.selectionEnd = end + symbolLength
    } else {
      editorInputElem.selectionStart = newSelection.start + symbolLength
      editorInputElem.selectionEnd = newSelection.end + symbolLength
    }
  } else {
    if (start === end) {
      editorInputElem.selectionStart = start - symbolLength
      editorInputElem.selectionEnd = end - symbolLength
    } else {
      editorInputElem.selectionStart = newSelection.start
      editorInputElem.selectionEnd = newSelection.end
    }
  }
}

const toggleSurround = (formattingSymbol) => {
  const editorInputElem = editorInput.value
  if (!editorInputElem) {
    return
  }
  editorInputElem.focus()

  const start = editorInputElem.selectionStart
  const end = editorInputElem.selectionEnd

  const rawText = currentValue.value ? currentValue.value.slice(start, end) : ''

  let symbolSurrounded

  if (formattingSymbol === '*') {
    symbolSurrounded =
      countSurroundingPairs(currentValue.value, start, end, formattingSymbol) % 2 !== 0
  } else {
    symbolSurrounded = countSurroundingPairs(currentValue.value, start, end, formattingSymbol) > 0
  }

  if (symbolSurrounded) {
    // select the symbols before and after the text
    editorInputElem.selectionStart = start - formattingSymbol.length
    editorInputElem.selectionEnd = end + formattingSymbol.length
    document.execCommand('insertText', false, rawText) // replace with just the text without the symbols

    // reset selection to just the text
    editorInputElem.selectionStart = start - formattingSymbol.length
    editorInputElem.selectionEnd = end - formattingSymbol.length
  } else {
    editorInputElem.selectionStart = start
    editorInputElem.selectionEnd = end
    document.execCommand('insertText', false, formattingSymbol + rawText + formattingSymbol)

    editorInputElem.selectionStart = start + formattingSymbol.length
    editorInputElem.selectionEnd = end + formattingSymbol.length
  }
}

function insert(str) {
  const editorInputElem = editorInput.value
  if (!editorInputElem) {
    return
  }
  editorInputElem.focus()

  const start = editorInputElem.selectionStart

  document.execCommand('insertText', false, str)

  editorInputElem.selectionStart = start
  editorInputElem.selectionEnd = start + str.length
}

function openLinkModal() {
  const editorInputElem = editorInput.value
  if (!editorInputElem) {
    return
  }

  const start = editorInputElem.selectionStart
  const end = editorInputElem.selectionEnd

  linkText.value = currentValue.value ? currentValue.value.slice(start, end) : ''
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

.editor-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--gap-xs);
  margin-bottom: var(--gap-sm);

  .divider {
    width: 0.125rem;
    height: 1.8rem;
    background-color: var(--color-button-bg);
    border-radius: var(--radius-max);
    margin-inline: var(--gap-xs);
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
  margin-left: auto;
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
