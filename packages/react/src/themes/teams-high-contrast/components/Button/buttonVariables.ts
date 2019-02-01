import { ButtonVariables } from '../../../teams/components/Button/buttonVariables'
import { Partial } from 'types/utils'

export default (siteVars: any): Partial<ButtonVariables> => {
  return {
    color: siteVars.white,
    colorDisabled: siteVars.black,
    backgroundColor: 'transparent',
    backgroundColorActive: siteVars.accessibleYellow,
    backgroundColorHover: siteVars.accessibleYellow,
    backgroundColorFocus: siteVars.accessibleYellow,
    backgroundColorDisabled: siteVars.accessibleGreen,
    borderColor: siteVars.white,
    borderColorActive: 'transparent',
    borderColorHover: 'transparent',
    borderColorFocus: siteVars.black,
    borderColorFocusIndicator: siteVars.white,

    primaryColor: siteVars.white,
    primaryColorActive: siteVars.black,
    primaryColorHover: siteVars.black,
    primaryColorFocus: siteVars.black,
    primaryBackgroundColor: siteVars.black,
    primaryBackgroundColorActive: siteVars.accessibleYellow,
    primaryBackgroundColorHover: siteVars.accessibleYellow,
    primaryBackgroundColorFocus: siteVars.accessibleYellow,
    primaryBorderColor: siteVars.white,
    primaryBorderColorFocus: siteVars.black,
    primaryBorderColorFocusIndicator: siteVars.white,
    primaryBorderWidth: 2,

    primaryCircularBorderColorFocusIndicator: siteVars.black,

    circularColor: siteVars.white,
    circularColorActive: siteVars.black,
    circularBackgroundColor: siteVars.black,
    circularBackgroundColorActive: siteVars.accessibleYellow,
    circularBackgroundColorHover: siteVars.accessibleYellow,
    circularBackgroundColorFocus: siteVars.accessibleYellow,
    circularBorderColor: siteVars.white,
    circularBorderColorActive: siteVars.white,
    circularBorderColorHover: siteVars.white,
    circularBorderColorFocus: siteVars.white,
    circularBorderColorFocusIndicator: siteVars.black,

    textColor: siteVars.accessibleYellow,
    textColorHover: siteVars.accessibleYellow,
    textPrimaryColor: siteVars.accessibleYellow,
    textPrimaryColorHover: siteVars.accessibleYellow,
    textSecondaryColor: siteVars.accessibleYellow,
    textSecondaryColorHover: siteVars.accessibleYellow,

    boxShadow: 'none',
  }
}
