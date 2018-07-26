import { pxToRem } from '../../lib'

export interface IGridVariables {
  gap: string
  padding: string
}

export default (): IGridVariables => ({
  gap: pxToRem(10),
  padding: pxToRem(10),
})
