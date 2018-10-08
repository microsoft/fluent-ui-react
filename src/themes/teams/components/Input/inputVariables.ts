import { pxToRem } from '../../../../lib'

export interface IInputVariables {
  iconPosition: string
  iconRight: string
}

export default (): IInputVariables => ({
  iconPosition: 'absolute',
  iconRight: pxToRem(2),
})
