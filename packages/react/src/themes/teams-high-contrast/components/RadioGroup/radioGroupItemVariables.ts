import { RadioGroupItemVariables } from 'src/themes/teams/components/RadioGroup/radioGroupItemVariables'

export default (siteVars: any): Partial<RadioGroupItemVariables> => ({
  colorDisabled: siteVars.accessibleGreen,

  textColorDefault: siteVars.colors.white,
  textColorDefaultHoverFocus: siteVars.colors.white,
  textColorChecked: siteVars.colors.white,

  iconBorderColorDefaultHover: siteVars.accessibleCyan,
  iconBorderColorChecked: siteVars.accessibleCyan,

  iconBackgroundColorChecked: siteVars.accessibleCyan,
})
