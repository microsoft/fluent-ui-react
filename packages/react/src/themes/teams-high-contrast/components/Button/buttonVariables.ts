import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

export default (siteVars: any): Partial<ButtonVariables> => {
  return {
    color: siteVars.white,
    colorDisabled: siteVars.black,
    backgroundColor: 'transparent',
    backgroundColorHover: siteVars.accessibleYellow,
    backgroundColorFocus: siteVars.accessibleYellow,
    backgroundColorDisabled: siteVars.accessibleGreen,
    borderColor: siteVars.white,
    borderColorHover: 'transparent',

    primaryColor: siteVars.white,
    primaryColorHover: siteVars.black,
    primaryColorFocus: siteVars.black,
    primaryBackgroundColor: siteVars.black,
    primaryBackgroundColorHover: siteVars.accessibleYellow,
    primaryBackgroundColorFocus: siteVars.accessibleYellow,
    primaryBorderColor: siteVars.white,

    circularColor: siteVars.white,
    circularColorActive: siteVars.black,
    circularBackgroundColor: siteVars.black,
    circularBackgroundColorHover: siteVars.accessibleYellow,
    circularBackgroundColorFocus: siteVars.accessibleYellow,
    circularBorderColor: siteVars.white,
    circularBorderColorHover: siteVars.white,
    circularBorderColorFocus: siteVars.white,

    textColor: siteVars.accessibleYellow,
    textColorHover: siteVars.accessibleYellow,
    textPrimaryColor: siteVars.accessibleYellow,
    textPrimaryColorHover: siteVars.accessibleYellow,
    textSecondaryColor: siteVars.accessibleYellow,
    textSecondaryColorHover: siteVars.accessibleYellow,

    boxShadow: 'none',
  }
}
