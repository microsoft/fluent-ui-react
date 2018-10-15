import { pxToRem } from '../../../../lib'

export interface IconVariables {
  [key: string]: string | number | undefined

  color?: string
  borderColor?: string
  disabledColor?: string

  horizontalSpace: string
}

export default (siteVars): IconVariables => ({
  // TODO move initial variable discovery to JSON files
  // similar to how components have an info.json file
  color: siteVars.gray02,
  borderColor: siteVars.gray02,
  disabledColor: siteVars.gray06,
  horizontalSpace: pxToRem(10),
})
