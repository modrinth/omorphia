export const createEditor = (textarea: HTMLTextAreaElement, setValue: (output: string) => void) => {
  return {
    /**
     * Define the symbol of the given modifier
     */
    mark: function (s: string, amt = 1) {
      this._symbol = s
      this._multiple = amt
      return this
    },
    focus: function () {
      this._getElem().focus()
      return this
    },
    getSelection: function () {
      const selection = this._getSelection()
      return this._getElem().value.substring(selection.start, selection.end)
    },
    getSelectionPosition: function () {
      return this._getSelection()
    },
    setSurroundingLines: function () {
      const elem = this._getElem()
      const lines = this._getLines()
      const tag = this._getTag()

      // before the first line, insert the tag + \n
      elem.value = this._insert(tag + '\n', lines.start)
      // after the last line, insert \n + tag + \n
      elem.value = this._insert('\n' + tag, lines.end + tag.length + 1)

      this._setSelection(lines.start + tag.length + 1, lines.end + tag.length + 1)

      return this
    },
    toggleSurround: function () {
      const selection = this._getSelection()
      const elem = this._getElem()
      const tag = this._getTag()

      // Check if the selection is already surrounded by the symbol
      const isSurrounded = isSurroundedBySymbol(elem.value, selection.start, selection.end, tag)

      if (isSurrounded) {
        elem.value = removeSymbolAroundSelection(elem.value, selection.start, selection.end, tag)
        this._setSelection(selection.start - tag.length, selection.end - tag.length)
      } else {
        elem.value = addSymbolAroundSelection(elem.value, selection.start, selection.end, tag)
        this._setSelection(selection.start + tag.length, selection.end + tag.length)
      }

      return this
    },
    togglePrefix: function () {
      const elem = this._getElem()
      const text = elem.value
      const lines = this._getLines()
      const tag = this._getTag()
      const tagToInsert = tag + ' '

      const lineValue = text.substring(lines.start, lines.end)
      const hasHeaderAlready = startsWithSymbolType(lineValue, this._symbol)

      if (hasHeaderAlready) {
        if (lineValue.startsWith(tagToInsert)) {
          elem.value = this._insert(lineValue.substring(tagToInsert.length), lines.start, lines.end)
          this._setSelection(lines.start, lines.end - tagToInsert.length)
        } else {
          // split lineValue at the first space
          const spaceIndex = lineValue.indexOf(' ')

          if (spaceIndex !== -1) {
            // if there is a space
            const newLine = tagToInsert + lineValue.substring(spaceIndex + 1)
            elem.value = this._insert(newLine, lines.start, lines.end)
            this._setSelection(lines.start + tagToInsert.length, lines.start + newLine.length)
          }
        }
      } else {
        elem.value = this._insert(tagToInsert + lineValue, lines.start, lines.end)
        this._setSelection(lines.start + tagToInsert.length, lines.end + tagToInsert.length)
      }

      return this
    },
    getPrefixFromAbove: function () {
      const elem = this._getElem()
      const lines = this._getLines()
      const text = elem.value.substring(lines.start, lines.end)
      // The prefix is the first word basically
      const firstSpace = text.indexOf(' ')
      if (firstSpace === -1) {
        return ''
      }
      // there needs to be content after the spaces after the first word or else it's not a prefix
      if (text.substring(firstSpace + 1).trim().length === 0) {
        return ''
      }
      return text.substring(0, firstSpace)
    },
    run: function () {
      // Commit the current value of the editor to the refed value
      setValue(this._getElem().value)
    },
    insert: function (s: string, pos?: number) {
      if (pos === undefined) {
        pos = this._getSelection().start
      }
      const elem = this._getElem()
      elem.value = this._insert(s, pos)
      this._setSelection(pos, pos + s.length)
      return this
    },
    type: function (s: string, pos?: number) {
      if (pos === undefined) {
        pos = this._getSelection().start
      }
      const elem = this._getElem()
      elem.value = this._insert(s, pos)
      this._setSelection(pos + s.length)
      return this
    },
    _getElem: function () {
      return textarea
    },
    _getSelection: function () {
      const elem = this._getElem()
      return {
        start: elem.selectionStart,
        end: elem.selectionEnd,
      }
    },
    _getLines: function () {
      const elem = this._getElem()
      const selection = this._getSelection()

      const textBefore = elem.value.substring(0, selection.start)
      const textAfter = elem.value.substring(selection.end)

      const lineStart = textBefore.lastIndexOf('\n') + 1
      const lineEnd = textAfter.indexOf('\n')

      return {
        start: lineStart,
        end: lineEnd === -1 ? elem.value.length : selection.end + lineEnd,
      }
    },
    _getTag: function () {
      return this._symbol.repeat(this._multiple)
    },
    _setSelection: function (start: number, end: number = start) {
      const elem = this._getElem()
      elem.selectionStart = start
      elem.selectionEnd = end
    },
    _insert: function (s: string, start: number, end: number = start) {
      const elem = this._getElem()
      return insertInSelection(elem.value, s, start, end)
    },
    _symbol: '',
    _multiple: 0,
  }
}

const escapeSymbol = (symbol: string) => {
  return symbol.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
}

export const insertInSelection = (s: string, value: string, start: number, end: number) => {
  return s.substring(0, start) + value + s.substring(end)
}

export const isSurroundedBySymbol = (s: string, start: number, end: number, symbol: string) => {
  const text = s

  // Symbols like * & ~ and such are protected symbols in regex, so we need to escape them
  const escapedSymbol = escapeSymbol(symbol)
  const prefixRegex = new RegExp(`${escapedSymbol}+$`)
  const suffixRegex = new RegExp(`^${escapedSymbol}+`)

  const leadingText = text.substring(0, start)
  const trailingText = text.substring(end)

  const prefix = prefixRegex.exec(leadingText)
  const suffix = suffixRegex.exec(trailingText)

  // Make sure the symbol is the same on both sides
  if (prefix && suffix && prefix[0] === suffix[0]) {
    if (prefix[0] === symbol) {
      // If the whole symbol is exactly the same, then it's surrounded
      return true
    }

    // If the prefix can remove an instance of the symbol and not equal itself, then it's surrounded
    const length = symbol.length
    const removedLength = prefix[0].length - length

    if (removedLength < 0) {
      return false
    }
    if (removedLength === length) {
      return false
    }
    return true
  }
  return false
}

/** Checks for N symbols + a space at the start of the string */
export const startsWithSymbolType = (s: string, symbol: string) => {
  const escapedSymbol = escapeSymbol(symbol)
  const prefixRegex = new RegExp(`^${escapedSymbol}+ `)
  const prefix = prefixRegex.exec(s)
  return !!prefix
}

export const addSymbolAroundSelection = function (
  s: string,
  start: number,
  end: number,
  symbol: string
) {
  return s.substring(0, start) + symbol + s.substring(start, end) + symbol + s.substring(end)
}

export const removeSymbolAroundSelection = function (
  s: string,
  start: number,
  end: number,
  symbol: string
) {
  return (
    s.substring(0, start - symbol.length) +
    s.substring(start, end) +
    s.substring(end + symbol.length)
  )
}
