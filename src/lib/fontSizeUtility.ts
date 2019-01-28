import * as _ from 'lodash'
import { PxToRemFunc } from '../themes/types'

const createResolver = getData => {
  const resolver = withTools => getData(withTools)
  resolver.__marker = true

  return resolver
}

// TODO Marker should be renamed, consider to use Symbol
export const resolve = getData => createResolver(getData)

/**
 * Converts the provided px size to rem based on the default font size of 16px unless
 * another base size is provided.
 * @param {number} pxValue The px value to convert to rem.
 * @param {number} [baseSize] Base font size to use for rem convertion. Optional, 16px is used by default.
 * @example
 * // Returns '1rem'
 * pxToRem(16)
 *
 *  * // Returns '2rem'
 * pxToRem(16, 8)
 * @returns {string} The value converted to the rem.
 */
export const pxToRem: PxToRemFunc = (pxValue: number, remSize: number = 16): string => {
  return `${_.round(pxValue / remSize, 4)}rem`
}
