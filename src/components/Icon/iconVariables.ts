import { pxToRem } from '../../lib'

export interface IconVariables {
  borderColor: string
  color: string
  horizontalSpace: string
  margin: string
}

export default (): IconVariables => ({
  borderColor: undefined,
  color: 'black',
  horizontalSpace: pxToRem(10),
  margin: '0 0.25em 0 0',
})
