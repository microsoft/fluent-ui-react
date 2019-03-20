import { RadioGroupItemVariables } from 'src/themes/teams/components/RadioGroup/radioGroupItemVariables'

export default (siteVars: any): Partial<RadioGroupItemVariables> => ({
  textColorDefault: siteVars.gray02,
  textColorDefaultHoverFocus: siteVars.white,
  textColorChecked: siteVars.white,

  iconBorderColorDefaultHover: siteVars.white,
  iconBorderColorChecked: siteVars.brand06,

  iconBackgroundColorDefault: siteVars.white,
  iconBackgroundColorChecked: siteVars.brand06,

  iconColorBoxShadowFocus: siteVars.brand,
})
