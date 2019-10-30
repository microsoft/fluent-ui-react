import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

export interface ButtonHighContrastVariables {
  backgroundColorFocus: string
  primaryBackgroundColorFocus: string
}

export default (siteVars: any): Partial<ButtonVariables> & ButtonHighContrastVariables => {
  return {
    backgroundColorActive: siteVars.colors.white,
    backgroundColorFocus: siteVars.accessibleCyan,
    borderColorActive: siteVars.colors.white,
    backgroundColorDisabled: siteVars.accessibleGreen,

    primaryBackgroundColorActive: siteVars.colors.white,
    primaryBackgroundColorFocus: siteVars.accessibleCyan,

    invertedColor: siteVars.colors.white,
    invertedColorHover: siteVars.colors.black,
    invertedColorFocus: siteVars.colors.white,
    invertedColorFocusVisible: siteVars.colors.black,
    invertedBackgroundColorActive: siteVars.accessibleYellow,
    invertedBackgroundColorHover: siteVars.accessibleYellow,
    invertedBorderColor: siteVars.colors.white,
    invertedBorderColorHover: 'transparent',

    boxShadow: 'none',
    primaryBoxShadow: 'none',
  }
}
