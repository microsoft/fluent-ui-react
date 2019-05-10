import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'

export default (siteVars: any): Partial<ButtonVariables> => {
  return {
    color: siteVars.colors.white,
    colorDisabled: siteVars.colors.black,
    backgroundColor: 'transparent',
    backgroundColorActive: siteVars.accessibleYellow,
    backgroundColorHover: siteVars.accessibleYellow,
    backgroundColorFocus: siteVars.accessibleYellow,
    backgroundColorDisabled: siteVars.accessibleGreen,
    borderColor: siteVars.colors.white,
    borderColorActive: 'transparent',
    borderColorHover: 'transparent',
    borderColorFocus: siteVars.colors.black,
    borderColorFocusIndicator: siteVars.colors.white,

    primaryColor: siteVars.colors.white,
    primaryColorActive: siteVars.colors.black,
    primaryColorHover: siteVars.colors.black,
    primaryColorFocus: siteVars.colors.black,
    primaryBackgroundColor: siteVars.colors.black,
    primaryBackgroundColorActive: siteVars.accessibleYellow,
    primaryBackgroundColorHover: siteVars.accessibleYellow,
    primaryBackgroundColorFocus: siteVars.accessibleYellow,
    primaryBorderColor: siteVars.colors.white,
    primaryBorderColorFocus: siteVars.colors.black,
    primaryBorderColorFocusIndicator: siteVars.colors.white,
    primaryBorderWidth: 2,

    primaryCircularBorderColorFocusIndicator: siteVars.colors.black,

    circularColor: siteVars.colors.white,
    circularColorActive: siteVars.colors.black,
    circularBackgroundColor: siteVars.colors.black,
    circularBackgroundColorActive: siteVars.accessibleYellow,
    circularBackgroundColorHover: siteVars.accessibleYellow,
    circularBackgroundColorFocus: siteVars.accessibleYellow,
    circularBorderColor: siteVars.colors.white,
    circularBorderColorActive: siteVars.colors.white,
    circularBorderColorHover: siteVars.colors.white,
    circularBorderColorFocus: siteVars.colors.white,
    circularBorderColorFocusIndicator: siteVars.colors.black,

    textColor: siteVars.accessibleYellow,
    textColorHover: siteVars.accessibleYellow,
    textPrimaryColor: siteVars.accessibleYellow,
    textPrimaryColorHover: siteVars.accessibleYellow,
    textSecondaryColor: siteVars.accessibleYellow,
    textSecondaryColorHover: siteVars.accessibleYellow,

    boxShadow: 'none',
  }
}
