import { RadioGroupItemVariables } from 'src/themes/teams/components/RadioGroup/radioGroupItemVariables'

export default (siteVars: any): Partial<RadioGroupItemVariables> => ({
  textColorDefault: siteVars.white,
  textColorDefaultHoverFocus: siteVars.white,
  textColorChecked: siteVars.white,

  iconBorderColorChecked: siteVars.accessibleCyan,

  iconBackgroundColorDefault: siteVars.white,
  iconBackgroundColorChecked: siteVars.accessibleCyan,

  iconColorBoxShadowFocus: siteVars.accessibleYellow,
})
