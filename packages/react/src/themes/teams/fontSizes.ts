import { FontSizesInput } from '../types'

const fontSizes: FontSizesInput = pxToRem => ({
  smaller: pxToRem(10),
  small: pxToRem(12),
  medium: pxToRem(14),
  large: pxToRem(18),
  larger: pxToRem(24),
})

export default fontSizes
