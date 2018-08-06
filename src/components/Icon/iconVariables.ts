import { pxToRem } from '../../lib'

export interface IconVariables {
  color: string
  backgroundColor: string
  borderColor: string
  borderSize: string
  horizontalSpace: string
  margin: string
}

export default (): IconVariables => ({
  color: 'black',
  backgroundColor: undefined,
  borderColor: undefined,
  borderSize: '0.1em',
  horizontalSpace: pxToRem(10),
  margin: '0 0.25em 0 0',
})
