import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

export default (siteVars: any): Partial<ButtonVariables> => {
  return {
    color: siteVars.colors.white,
    colorActive: siteVars.colors.white,
    colorHover: siteVars.colors.white,
    colorFocus: siteVars.colors.white,
    colorDisabled: siteVars.colors.grey.dark06,
    backgroundColor: 'transparent',
    backgroundColorHover: siteVars.colors.grey.dark14,
    backgroundColorFocus: siteVars.colors.grey.dark08,
    backgroundColorActive: siteVars.colors.grey.dark08,
    backgroundColorDisabled: siteVars.colors.grey.dark09,
    borderColor: siteVars.colors.grey.dark08,
    borderColorActive: siteVars.colors.grey.dark06,
    borderColorFocus: siteVars.black,
    borderColorHover: siteVars.colors.grey.dark06,
    borderColorFocusIndicator: siteVars.colors.white,

    primaryBackgroundColorActive: siteVars.brand08,
    primaryBackgroundColorHover: siteVars.brand08,
    primaryBackgroundColorFocus: siteVars.brand14,
    primaryBorderColorFocus: siteVars.black,
    primaryBorderColorFocusIndicator: siteVars.colors.white,

    circularColor: siteVars.colors.grey.dark02,
    circularColorActive: siteVars.black,
    circularBackgroundColorActive: siteVars.colors.grey.dark02,
    circularBackgroundColorHover: siteVars.colors.grey.dark03,
    circularBackgroundColorFocus: siteVars.colors.grey.dark02,
    circularBorderColor: siteVars.colors.grey.dark02,
    circularBorderColorFocusIndicator: siteVars.black,
  }
}
