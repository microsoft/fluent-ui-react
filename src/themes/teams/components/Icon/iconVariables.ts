import { pxToRem } from '../../../../lib'

export interface IconVariables {
  color: string
  backgroundColor: string
  borderColor: string
  horizontalSpace: string
  margin: string
}

export default (): IconVariables => ({
  color: 'black',
  // TODO move initial variable discovery to JSON files
  // similar to how components have an info.json file
  backgroundColor: undefined,
  borderColor: undefined,
  horizontalSpace: pxToRem(10),
  margin: '0 0.25em 0 0',
})
