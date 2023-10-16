/**
 * Use a builder to perform operations on a textarea
 * @param {import('vue').Ref<HTMLTextAreaElement>} textareaReference
 * @param {(string) => void} setValue
 * @returns An editor object
 */
export const createEditor = (textareaReference, setValue = console.log) => {
  const editorReference = textareaReference
  if (!editorReference) {
    return undefined
  }
  return {
    /**
     * Define the symbol of the given modifier
     * ```js
     * // To create a **bold** modifier:
     * createEditor(editorInput).mark('*', 2)
     * // Selection operations will consider this symbol
     * // **bold** <=> bold
     * // ***bold*** => *bold* => ***bold***
     * ```
     */
    mark: function (str, amt = 1) {
      this._symbol = str
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

      console.log(elem.value)

      return this
    },
    run: function () {
      // Commit the current value of the editor to the refed value
      setValue(this._getElem().value)
    },
    insert: function (str, pos = this._getSelection().start) {
      const elem = this._getElem()
      elem.value = this._insert(str, pos)
      this._setSelection(pos, pos + str.length)
      return this
    },
    /**
     * @private
     */
    _getElem: function () {
      return editorReference.value
    },
    /**
     * @private
     */
    _getSelection: function () {
      const elem = this._getElem()
      return {
        start: elem.selectionStart,
        end: elem.selectionEnd,
      }
    },
    /**
     * @private
     */
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
    /**
     * @private
     */
    _getTag: function () {
      return this._symbol.repeat(this._multiple)
    },
    /**
     * @private
     */
    _setSelection: function (start, end = start) {
      const elem = this._getElem()
      elem.selectionStart = start
      elem.selectionEnd = end
    },
    /**
     * @private
     */
    _insert: function (str, start, end = start) {
      const elem = this._getElem()
      return insertInSelection(elem.value, str, start, end)
    },
    /**
     * @private
     */
    _symbol: '',
    /**
     * @private
     */
    _multiple: 0,
  }
}

/**
 * Make regex safe
 * @param {string} symbol
 * @returns {string}
 */
const escapeSymbol = (symbol) => {
  return symbol.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
}

/**
 * @param {string} s
 * @param {string} value the value to insert
 * @param {number} start Start index of the selection
 * @param {number} end End index of the selection
 * @returns {string}
 */
export const insertInSelection = (s, value, start, end) => {
  return s.substring(0, start) + value + s.substring(end)
}

/**
 * Check for a valid tag around the selection. Markdown allows for a tag to be
 * a multiple of the same symbol, so we need to consider that.
 * @param {string} s
 * @param {number} start Index of the start of the selection
 * @param {number} end Index of the end of the selection
 * @param {string} symbol The symbol to check for
 * @returns {boolean}
 */
export const isSurroundedBySymbol = (s, start, end, symbol) => {
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

/**
 * @param {string} s The selection to look at inclusively
 * @param {string} symbol The symbol to look for
 */
export const startsWithSymbolType = (s, symbol) => {
  const escapedSymbol = escapeSymbol(symbol)
  const prefixRegex = new RegExp(`^${escapedSymbol}+ `)
  const prefix = prefixRegex.exec(s)
  return !!prefix
}

/**
 * @param {string} s
 * @param {number} start
 * @param {number} end
 * @param {string} symbol
 * @returns {string}
 */
export const addSymbolAroundSelection = function (s, start, end, symbol) {
  const tag = symbol
  return s.substring(0, start) + tag + s.substring(start, end) + tag + s.substring(end)
}

/**
 * @param {string} s
 * @param {number} start
 * @param {number} end
 * @param {string} symbol
 * @returns {string}
 */
export const removeSymbolAroundSelection = function (s, start, end, symbol) {
  return (
    s.substring(0, start - symbol.length) +
    s.substring(start, end) +
    s.substring(end + symbol.length)
  )
}
