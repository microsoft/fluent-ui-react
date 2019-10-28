import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

export default (siteVars: any): Partial<ButtonVariables> => {
  return {
    color: siteVars.colors.white,
    colorHover: siteVars.colors.white,
    colorFocus: siteVars.colors.white,
    backgroundColor: 'transparent',
    backgroundColorHover: siteVars.colors.grey[550],
    backgroundColorFocus: siteVars.colors.grey[500],
    backgroundColorActive: siteVars.colors.grey[500],
    backgroundColorDisabled: siteVars.colors.grey[550],
    borderColor: siteVars.colors.grey[500],
    borderColorHover: siteVars.colors.grey[450],

    invertedColor: siteVars.colors.white,
    invertedColorHover: siteVars.colors.white,
    invertedColorFocus: siteVars.colors.white,
    invertedBackgroundColor: 'transparent',
    invertedBackgroundColorActive: 'rgba(255,255,255,.2)',
    invertedBackgroundColorHover: 'rgba(255,255,255,.1)',
    invertedBackgroundColorFocus: 'rgba(255,255,255,.2)',
    invertedBackgroundColorDisabled: siteVars.colors.grey[150],
    invertedBorderColor: 'rgba(255,255,255,.3)',

    primaryBackgroundColorActive: siteVars.colors.brand[800],
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
