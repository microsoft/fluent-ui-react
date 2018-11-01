import { pxToRem } from '../../../../lib'

export interface IconVariables {
  [key: string]: string | number | boolean | undefined

  color?: string
  backgroundColor?: string
  borderColor?: string
  horizontalSpace: string
  margin: string
  secondaryColor: string
  disabledColor: string
  filled?: boolean
}

export default (siteVars): IconVariables => ({
  color: undefined,
  backgroundColor: undefined,
  borderColor: undefined,
  horizontalSpace: pxToRem(10),
  margin: '0 0.25em 0 0',
  secondaryColor: siteVars.white,
  disabledColor: siteVars.gray06,
  filled: undefined,
})
