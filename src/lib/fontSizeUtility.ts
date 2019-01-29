import * as _ from 'lodash'
import isBrowser from './isBrowser'

const DEFAULT_REM_SIZE_IN_PX = 16

let _documentRemSize: number | null = null

const getDocumentRemSize = (): number => {
  return isBrowser()
    ? getFontSizeValue(getComputedStyle(document.documentElement).fontSize) ||
        DEFAULT_REM_SIZE_IN_PX
    : DEFAULT_REM_SIZE_IN_PX
}

const getFontSizeValue = (size?: string | null): number | null => {
  return (size && parseFloat(size)) || null
}

/**
 * Converts the provided px size to rem based on the default font size of 10px unless
 * the HTML font size has been previously defined with setHTMLFontSize().
 * @param {number} valueInPx The px value to convert to rem.
 * @example
 * // Returns '1rem'
 * pxToRem(10)
 * @returns {string} The value converted to the rem.
 */
export const pxToRem = (valueInPx: number = 0): string => {
  if (!_documentRemSize) {
    _documentRemSize = getDocumentRemSize()
  }

  if (process.env.NODE_ENV !== 'production') {
    if (valueInPx < 0) {
      throw new Error(`Invalid value of: '${valueInPx}'.`)
    }
  }
  const convertedValueInRems = valueInPx / _documentRemSize

  return `${_.round(convertedValueInRems, 4)}rem`
}
