export interface IconVariables {
  [key: string]: string | number | undefined

  secondaryColor: string
  color?: string
  borderColor?: string
  disabledColor?: string
  horizontalSpace: number
}

export default (siteVars): IconVariables => ({
  secondaryColor: siteVars.white,
  color: undefined,
  borderColor: undefined,
  disabledColor: siteVars.gray06,
  horizontalSpace: 10,
})
