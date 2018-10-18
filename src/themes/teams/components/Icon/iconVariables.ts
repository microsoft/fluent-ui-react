import { teamsPxToRem } from '../../utils'

export interface IconVariables {
  [key: string]: string | number | undefined

  color?: string
  backgroundColor?: string
  borderColor?: string
  horizontalSpace: string
  margin: string
  secondaryColor: string
}

export default (): IconVariables => ({
  color: undefined,
  // TODO move initial variable discovery to JSON files
  // similar to how components have an info.json file
  backgroundColor: undefined,
  borderColor: undefined,
  horizontalSpace: teamsPxToRem(10),
  margin: '0 0.25em 0 0',
  secondaryColor: 'white',
})
