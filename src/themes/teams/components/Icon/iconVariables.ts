import { pxToRem } from '../../../../lib'

export interface IconVariables {
  [key: string]: string | number | boolean | undefined

  outline?: boolean

  color?: string
  backgroundColor?: string
  borderColor?: string
  horizontalSpace: string
  margin: string
  secondaryColor: string
  disabledColor: string
}

export default (siteVars): IconVariables => ({
  outline: undefined,

  color: undefined,
  backgroundColor: undefined,
  borderColor: undefined,
  horizontalSpace: pxToRem(10),
  margin: '0 0.25em 0 0',
  secondaryColor: siteVars.white,
  disabledColor: siteVars.gray06,
})
