import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

export interface ButtonHighContrastVariables {
  backgroundColorFocus: string
  primaryBackgroundColorFocus: string
  secondaryAltColorHover: string
  secondaryAltBorderColorHover: string
  secondaryAltColorFocusVisible: string
}

export default (siteVars: any): Partial<ButtonVariables> & ButtonHighContrastVariables => {
  return {
    backgroundColorActive: siteVars.colors.white,
    backgroundColorFocus: siteVars.accessibleCyan,
    borderColorActive: siteVars.colors.white,
    backgroundColorDisabled: siteVars.accessibleGreen,

    primaryBackgroundColorActive: siteVars.colors.white,
    primaryBackgroundColorFocus: siteVars.accessibleCyan,

    secondaryAltColor: siteVars.colors.white,
    secondaryAltColorHover: siteVars.colors.black,
    secondaryAltColorFocusVisible: siteVars.colors.black,
    secondaryAltBackgroundColorActive: siteVars.accessibleYellow,
    secondaryAltBackgroundColorHover: siteVars.accessibleYellow,
    secondaryAltBorderColor: siteVars.colors.white,
    secondaryAltBorderColorHover: 'transparent',

    boxShadow: 'none',
    primaryBoxShadow: 'none',
  }
}
