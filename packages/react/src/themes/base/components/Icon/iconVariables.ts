import { pxToRem } from '../../../../lib'

export interface IconVariables {
  color: string
  borderColor: string
  disabledColor: string
  horizontalSpace: string
}

export default (): IconVariables => ({
  color: undefined,
  borderColor: 'black',
  disabledColor: 'gray',

  horizontalSpace: pxToRem(10),
})
