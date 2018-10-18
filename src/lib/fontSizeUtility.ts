import * as _ from 'lodash'

const DEFAULT_FONT_SIZE_IN_PX = 16

/**
 * Converts the provided px size to rem based on the default font size of 16px unless
 * another base size is provided.
 * @param {number} value The px value to convert to rem.
 * @param {number} [baseSize] Base font size to use for rem convertion. Optional, 16px is used by default.
 * @example
 * // Returns '1rem'
 * pxToRem(16)
 *
 *  * // Returns '2rem'
 * pxToRem(16, 8)
 * @returns {string} The value converted to the rem.
 */
export const pxToRem = (value: number, baseSize?: number): string => {
  if (process.env.NODE_ENV !== 'production') {
    if (value < 0) {
      throw new Error(`Invalid value of: '${value}'.`)
    }
  }

  const baseFontSize = baseSize || DEFAULT_FONT_SIZE_IN_PX
  const convertedValueInRems = value / baseFontSize

  return `${_.round(convertedValueInRems, 4)}rem`
}
