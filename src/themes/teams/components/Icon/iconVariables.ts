export interface IconVariables {
  [key: string]: string | number | undefined

  backgroundColor: string
  secondaryColor: string
  color?: string
  borderColor?: string
  disabledColor?: string
  horizontalSpace: number
}

export default (siteVars): IconVariables => ({
  backgroundColor: undefined,
  secondaryColor: siteVars.white,
  color: undefined,
  borderColor: undefined,
  disabledColor: siteVars.gray06,
  horizontalSpace: 10,
})
