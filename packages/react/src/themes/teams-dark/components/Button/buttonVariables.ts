import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

export default (siteVars: any): Partial<ButtonVariables> => {
  return {
    color: siteVars.colors.white,
    colorActive: siteVars.colors.white,
    colorHover: siteVars.colors.white,
    colorFocus: siteVars.colors.white,
    backgroundColor: 'transparent',
    borderColorFocus: siteVars.black,
    borderColorFocusIndicator: siteVars.colors.white,

    primaryBackgroundColorActive: siteVars.brand08,
    primaryBackgroundColorHover: siteVars.brand08,
    primaryBackgroundColorFocus: siteVars.brand14,
    primaryBorderColorFocus: siteVars.black,
    primaryBorderColorFocusIndicator: siteVars.colors.white,

    circularColorActive: siteVars.black,
    circularBackgroundColorActive: siteVars.colors.grey.dark02,
    circularBackgroundColorHover: siteVars.colors.grey.dark03,
    circularBackgroundColorFocus: siteVars.colors.grey.dark02,
    circularBorderColorFocusIndicator: siteVars.black,
  }
}
