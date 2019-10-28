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

    primaryColor: siteVars.colors.black,
    primaryColorHover: siteVars.colors.black,
    primaryColorFocus: siteVars.colors.black,
    primaryBackgroundColor: siteVars.colors.white,
    primaryBackgroundColorActive: siteVars.accessibleYellow,
    primaryBackgroundColorHover: siteVars.accessibleYellow,
    primaryBackgroundColorFocus: siteVars.accessibleYellow,
    primaryBorderColor: siteVars.colors.white,

    invertedColor: siteVars.colors.white,
    invertedColorHover: siteVars.colors.black,
    invertedColorFocus: siteVars.colors.black,
    invertedBackgroundColor: 'transparent',
    invertedBackgroundColorActive: siteVars.accessibleYellow,
    invertedBackgroundColorFocus: siteVars.accessibleYellow,
    invertedBackgroundColorHover: siteVars.accessibleYellow,
    invertedBackgroundColorDisabled: siteVars.accessibleGreen,
    invertedBorderColor: siteVars.colors.white,
    invertedBorderColorHover: 'transparent',

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
