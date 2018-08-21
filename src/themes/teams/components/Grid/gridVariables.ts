import { pxToRem } from '../../../../lib'

export interface IGridVariables {
  height: string
  width: string
  defaultColumnCount: number
  gridGap: string
  padding: string
}

export default (): IGridVariables => ({
  height: '100%',
  width: '100%',
  defaultColumnCount: 5,
  gridGap: undefined,
  padding: undefined,
})
