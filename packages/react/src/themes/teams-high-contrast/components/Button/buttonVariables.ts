import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

export interface ButtonHighContrastVariables {
  backgroundColorFocus: string
  primaryBackgroundColorFocus: string
  textColorIconOnly: string
  backgroundColorIconOnlyHover: string
}

export default (siteVars: any): Partial<ButtonVariables> & ButtonHighContrastVariables => {
  return {
    backgroundColorActive: siteVars.colors.white,
    backgroundColorFocus: siteVars.accessibleCyan,
    borderColorActive: siteVars.colors.white,
    backgroundColorDisabled: siteVars.accessibleGreen,

    textColorIconOnly: siteVars.colors.black,
    backgroundColorIconOnlyHover: siteVars.colorScheme.default.backgroundHover,

    primaryBackgroundColorActive: siteVars.colors.white,
    primaryBackgroundColorFocus: siteVars.accessibleCyan,

    boxShadow: 'none',
    primaryBoxShadow: 'none',
  }
}
