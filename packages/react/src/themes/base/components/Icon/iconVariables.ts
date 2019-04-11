import { pxToRem } from '../../../../lib'

export type IconSizeModifier = 'x' | 'xx'

export interface IconVariables {
  [key: string]: object | string | number | boolean | undefined
  color?: string
  borderColor?: string

  horizontalSpace: string
}

export default (): IconVariables => ({
  color: undefined,
  borderColor: 'black',
  disabledColor: 'gray',

  horizontalSpace: pxToRem(10),
})
