import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

export default (siteVars: any): Partial<ButtonVariables> => {
  return {
    color: siteVars.colors.white,
    colorHover: siteVars.colors.white,
    colorFocus: siteVars.colors.white,
    backgroundColor: 'transparent',
    backgroundColorHover: siteVars.colors.grey[700],
    backgroundColorFocus: siteVars.colors.grey[500],
    backgroundColorActive: siteVars.colors.grey[500],
    backgroundColorDisabled: siteVars.colors.grey[550],
    borderColor: siteVars.colors.grey[500],
    borderColorHover: siteVars.colors.grey[450],

    primaryBackgroundColorActive: siteVars.colors.brand[500],
    primaryBackgroundColorHover: siteVars.colors.brand[500],
    primaryBackgroundColorFocus: siteVars.colors.brand[800],

    circularColor: siteVars.colors.grey[250],
    circularColorActive: siteVars.colors.grey[800],
    circularBackgroundColorActive: siteVars.colors.grey[250],
    circularBackgroundColorHover: siteVars.colors.grey[300],
    circularBackgroundColorFocus: siteVars.colors.grey[250],
    circularBorderColor: siteVars.colors.grey[250],
  }
}
