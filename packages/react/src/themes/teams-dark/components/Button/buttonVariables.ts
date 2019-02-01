import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

export default (siteVars: any): Partial<ButtonVariables> => {
  return {
    color: siteVars.white,
    colorActive: siteVars.white,
    colorHover: siteVars.white,
    colorFocus: siteVars.white,
    backgroundColor: 'transparent',
    borderColorFocus: siteVars.black,
    borderColorFocusIndicator: siteVars.white,

    primaryBackgroundColorActive: siteVars.brand08,
    primaryBackgroundColorHover: siteVars.brand08,
    primaryBackgroundColorFocus: siteVars.brand14,
    primaryBorderColorFocus: siteVars.black,
    primaryBorderColorFocusIndicator: siteVars.white,

    circularColorActive: siteVars.black,
    circularBackgroundColorActive: siteVars.gray02,
    circularBackgroundColorHover: siteVars.gray03,
    circularBackgroundColorFocus: siteVars.gray02,
    circularBorderColorFocusIndicator: siteVars.black,
  }
}
