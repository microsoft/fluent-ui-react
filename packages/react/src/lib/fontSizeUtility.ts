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

export const updateCachedRemSize = () => {
  _documentRemSize = null
}

/**
 * Converts the provided px size to rem based on the default font size of 10px unless
 * the HTML font size has been previously defined with setHTMLFontSize().
 * @param {number} valueInPx - The px value to convert to rem.
 * @param {number} baseRemSize - Rem size to use for convertions. Optional - document's font size will be taken otherwise.
 * @example
 * // Returns '1rem' for default document font size (16px).
 * pxToRem(16)
 *
 * // Returns '2rem'.
 * pxToRem(32, 16)
 * @returns {string} The value converted to the rem.
 */
export const pxToRem = (valueInPx: number, baseRemSize?: number): string => {
  if (!baseRemSize && !_documentRemSize) {
    _documentRemSize = getDocumentRemSize()
  }

  const remSize = baseRemSize || _documentRemSize || DEFAULT_REM_SIZE_IN_PX
  const convertedValueInRems = valueInPx / remSize

  return `${_.round(convertedValueInRems, 4)}rem`
}
