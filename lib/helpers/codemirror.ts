import { EditorState, Transaction } from '@codemirror/state'
import { type Command, type KeyBinding } from '@codemirror/view'

const toggleBold: Command = ({ state, dispatch }) => {
  return toggleAround(state, dispatch, '**', '**')
}

const toggleItalic: Command = ({ state, dispatch }) => {
  return toggleAround(state, dispatch, '_', '_')
}

const toggleStrikethrough: Command = ({ state, dispatch }) => {
  return toggleAround(state, dispatch, '~~', '~~')
}

const toggleCodeBlock: Command = ({ state, dispatch }) => {
  return toggleAround(state, dispatch, '```', '```', true)
}

const toggleHeader: Command = ({ state, dispatch }) => {
  return toggleLineStart(state, dispatch, '# ')
}

const toggleQuote: Command = ({ state, dispatch }) => {
  return toggleLineStart(state, dispatch, '> ')
}

type Dispatch = (tr: Transaction) => void

const surroundedByText = (
  state: EditorState,
  open: string,
  close: string
): 'inclusive' | 'exclusive' | 'none' => {
  const { from, to } = state.selection.main

  // Check for inclusive surrounding first
  const selectedText = state.doc.sliceString(from, to)
  if (selectedText.startsWith(open) && selectedText.endsWith(close)) {
    return 'inclusive'
  }

  // Then check for exclusive surrounding
  const beforeText = state.doc.sliceString(Math.max(0, from - open.length), from)
  const afterText = state.doc.sliceString(to, to + close.length)
  if (beforeText === open && afterText === close) {
    return 'exclusive'
  }

  // Return 'none' if no surrounding detected
  return 'none'
}

const toggleAround = (
  state: EditorState,
  dispatch: Dispatch,
  open: string,
  close: string,
  isBlock = false
): boolean => {
  const { from, to } = state.selection.main

  const isSurrounded = surroundedByText(state, open, close)

  if (isSurrounded !== 'none') {
    const isInclusive = isSurrounded === 'inclusive'
    let transaction: Transaction

    if (isInclusive) {
      // Remove delimiters on the inside edges of the selected text
      transaction = state.update({
        changes: [
          { from, to: from + open.length, insert: '' },
          { from: to - close.length, to, insert: '' },
        ],
      })
    } else {
      // Remove delimiters on the outside edges of the selected text
      transaction = state.update({
        changes: [
          { from: from - open.length, to: from, insert: '' },
          { from: to, to: to + close.length, insert: '' },
        ],
      })
    }

    dispatch(transaction)
    return true
  }

  if (isBlock) {
    // Check for nested block elements (naive implementation)
    const lines = state.doc.sliceString(0).split('\n')
    for (const line of lines) {
      if (line.startsWith('```') || line.startsWith('# ') || line.startsWith('> ')) {
        return false // Block elements should not be nested
      }
    }
  }

  // Add delimiters around the selected text
  const transaction = state.update({
    changes: [
      { from, insert: open },
      { from: to, insert: close },
    ],
    selection: { anchor: from + open.length, head: to + open.length },
  })

  dispatch(transaction)

  if (isBlock) {
    const cursorPos = from + open.length + 1
    dispatch(state.update({ selection: { anchor: cursorPos, head: cursorPos } }))
  }

  return true
}

const toggleLineStart = (state: EditorState, dispatch: Dispatch, text: string): boolean => {
  const lines = state.doc.lineAt(state.selection.main.from)

  const range = {
    from: lines.from,
    to: state.selection.main.to,
  }

  const selectedText = state.doc.sliceString(range.from, range.to)
  console.log(JSON.stringify({ range, selectedText }))

  const shouldRemove = selectedText.startsWith(text)

  if (shouldRemove) {
    const numOfSelectedLinesThatNeedToBeRemoved = selectedText.split('\n' + text).length
    const modifiedText = selectedText.substring(text.length).replaceAll('\n' + text, '\n')
    const transaction = state.update({
      changes: { from: range.from, to: range.to, insert: modifiedText },
      selection: {
        anchor: state.selection.main.from - text.length,
        head: state.selection.main.to - text.length * numOfSelectedLinesThatNeedToBeRemoved,
      },
    })
    dispatch(transaction)
    return true
  } else {
    const modifiedText = text + selectedText.replaceAll('\n', '\n' + text)
    const lengthDiff = modifiedText.length - selectedText.length
    const transaction = state.update({
      changes: { from: range.from, to: range.to, insert: modifiedText },
      selection: {
        anchor: state.selection.main.from + text.length,
        head: state.selection.main.to + lengthDiff,
      },
    })
    dispatch(transaction)
    return true
  }
}

const commands = {
  toggleBold,
  toggleItalic,
  toggleStrikethrough,
  toggleCodeBlock,
  toggleHeader,
  toggleQuote,
}

export const modrinthMarkdownEditorKeymap: KeyBinding[] = [
  { key: 'Mod-b', run: commands.toggleBold },
  { key: 'Mod-i', run: commands.toggleItalic },
  { key: 'Mod-e', run: commands.toggleCodeBlock },
  { key: 'Mod-s', run: commands.toggleStrikethrough },
  //   { key: 'Mod-h', run: commands.toggleHeader },
  { key: 'Mod-Shift-.', run: commands.toggleQuote },
]
