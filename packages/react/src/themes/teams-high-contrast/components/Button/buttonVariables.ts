import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

export default (siteVars: any): Partial<ButtonVariables> => {
  return {
    color: siteVars.colors.white,
    backgroundColor: 'transparent',
    backgroundColorActive: siteVars.accessibleYellow,
    backgroundColorHover: siteVars.accessibleYellow,
    backgroundColorFocus: siteVars.accessibleYellow,
    backgroundColorDisabled: siteVars.accessibleGreen,
    borderColor: siteVars.colors.white,
    borderColorHover: 'transparent',

    primaryColor: siteVars.colors.white,
    primaryColorHover: siteVars.colors.black,
    primaryColorFocus: siteVars.colors.black,
    primaryBackgroundColor: siteVars.colors.black,
    primaryBackgroundColorActive: siteVars.accessibleYellow,
    primaryBackgroundColorHover: siteVars.accessibleYellow,
    primaryBackgroundColorFocus: siteVars.accessibleYellow,
    primaryBorderColor: siteVars.colors.white,

    circularColor: siteVars.colors.white,
    circularColorActive: siteVars.colors.black,
    circularBackgroundColor: siteVars.colors.black,
    circularBackgroundColorActive: siteVars.accessibleYellow,
    circularBackgroundColorHover: siteVars.accessibleYellow,
    circularBackgroundColorFocus: siteVars.accessibleYellow,
    circularBorderColor: siteVars.colors.white,
    circularBorderColorHover: siteVars.colors.white,
    circularBorderColorFocus: siteVars.colors.white,

    boxShadow: 'none',
  }
}
