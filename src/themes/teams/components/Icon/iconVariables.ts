import { pxToRem } from '../../../../lib'

export interface IconVariables {
  [key: string]: string | number | undefined

  secondaryColor: string
  color?: string
  borderColor?: string
  disabledColor?: string
  horizontalSpace: string
}

export default (siteVars): IconVariables => ({
  secondaryColor: 'white',
  color: undefined, // siteVars.gray02,
  borderColor: undefined, // siteVars.gray02,
  disabledColor: siteVars.gray06,
  horizontalSpace: pxToRem(10),
})
