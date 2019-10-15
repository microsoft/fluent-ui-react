import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

export default (siteVars: any): Partial<ButtonVariables> => {
  return {
    color: siteVars.colors.white,
    backgroundColor: 'transparent',
    backgroundColorActive: siteVars.accessibleYellow,
    backgroundColorHover: siteVars.accessibleYellow,
    backgroundColorFocus: siteVars.accessibleCyan,
    backgroundColorDisabled: siteVars.accessibleGreen,
    borderColor: siteVars.colors.white,
    borderColorHover: siteVars.accessibleYellow,

    primaryColor: siteVars.colors.black,
    primaryColorHover: siteVars.colors.black,
    primaryColorFocus: siteVars.colors.black,
    primaryBackgroundColor: siteVars.colors.white,
    primaryBackgroundColorActive: siteVars.accessibleYellow,
    primaryBackgroundColorHover: siteVars.accessibleYellow,
    primaryBackgroundColorFocus: siteVars.accessibleCyan,

    circularColor: siteVars.colors.white,
    circularColorActive: siteVars.colors.black,
    circularBackgroundColor: siteVars.colors.black,
    circularBackgroundColorActive: siteVars.accessibleYellow,
    circularBackgroundColorHover: siteVars.accessibleYellow,
    circularBackgroundColorFocus: siteVars.accessibleCyan,
    circularBorderColor: siteVars.colors.white,
    circularBorderColorHover: siteVars.accessibleYellow,
    circularBorderColorFocus: siteVars.accessibleCyan,

    boxShadow: 'none',
  }
}
