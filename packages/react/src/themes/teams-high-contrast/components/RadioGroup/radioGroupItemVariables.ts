import { RadioGroupItemVariables } from 'src/themes/teams/components/RadioGroup/radioGroupItemVariables'

export default (siteVars: any): Partial<RadioGroupItemVariables> => ({
  colorDisabled: siteVars.accessibleGreen,

  textColorDefault: siteVars.white,
  textColorDefaultHoverFocus: siteVars.white,
  textColorChecked: siteVars.white,

  iconBorderColorDefaultHover: siteVars.accessibleCyan,
  iconBorderColorChecked: siteVars.accessibleCyan,

  iconBackgroundColorDefault: siteVars.white,
  iconBackgroundColorChecked: siteVars.accessibleCyan,

  iconColorBoxShadowFocus: siteVars.accessibleYellow,
})
