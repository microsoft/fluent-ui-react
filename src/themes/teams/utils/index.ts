import { pxToRem as basePxToRem } from '../../../lib'

const themeFontSizeInPx = 14

export const pxToRem = (sizeInPx: number) => basePxToRem(sizeInPx, themeFontSizeInPx)
