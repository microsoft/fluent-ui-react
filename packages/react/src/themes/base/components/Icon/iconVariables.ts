import { pxToRem } from '../../../../lib'

export interface IconVariables {
  color: string
  borderColor: string
  backgroundColor: string
  disabledColor: string
  horizontalSpace: string

  smallestSize: string
  smallerSize: string
  smallSize: string
  mediumSize: string
  largeSize: string
  largerSize: string
  largestSize: string
}

export default (): IconVariables => ({
  color: undefined,
  backgroundColor: undefined,
  borderColor: 'black',
  disabledColor: 'gray',

  horizontalSpace: pxToRem(10),

  smallestSize: pxToRem(7),
  smallerSize: pxToRem(10),
  smallSize: pxToRem(12),
  mediumSize: pxToRem(16),
  largeSize: pxToRem(20),
  largerSize: pxToRem(32),
  largestSize: pxToRem(40),
})
