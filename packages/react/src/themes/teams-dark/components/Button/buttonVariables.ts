import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

export default (siteVars: any): Partial<ButtonVariables> => {
  return {
    color: siteVars.colors.white,
    colorActive: siteVars.colors.white,
    colorHover: siteVars.colors.white,
    colorFocus: siteVars.colors.white,
    colorDisabled: siteVars.colors.grey[450],
    backgroundColor: 'transparent',
    backgroundColorHover: siteVars.colors.grey[700],
    backgroundColorFocus: siteVars.colors.grey[500],
    backgroundColorActive: siteVars.colors.grey[500],
    backgroundColorDisabled: siteVars.colors.grey[550],
    borderColor: siteVars.colors.grey[500],
    borderColorActive: siteVars.colors.grey[450],
    borderColorFocus: siteVars.colors.grey[800],
    borderColorHover: siteVars.colors.grey[450],
    borderColorFocusIndicator: siteVars.colors.white,

    primaryBackgroundColorActive: siteVars.colors.brand[500],
    primaryBackgroundColorHover: siteVars.colors.brand[500],
    primaryBackgroundColorFocus: siteVars.colors.brand[800],
    primaryBorderColorFocus: siteVars.colors.grey[800],
    primaryBorderColorFocusIndicator: siteVars.colors.white,

    circularColor: siteVars.colors.grey[250],
    circularColorActive: siteVars.colors.grey[800],
    circularBackgroundColorActive: siteVars.colors.grey[250],
    circularBackgroundColorHover: siteVars.colors.grey[300],
    circularBackgroundColorFocus: siteVars.colors.grey[250],
    circularBorderColor: siteVars.colors.grey[250],
    circularBorderColorFocusIndicator: siteVars.colors.grey[800],

    textColorHover: siteVars.colors.brand[300],
    textPrimaryColorHover: siteVars.colors.brand[300],
    textSecondaryColor: siteVars.colors.grey[300],
    textSecondaryColorHover: siteVars.colors.brand[300],
  }
}
