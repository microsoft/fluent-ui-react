import { RadioGroupItemVariables } from 'src/themes/teams/components/RadioGroup/radioGroupItemVariables'

export default (siteVars: any): Partial<RadioGroupItemVariables> => ({
  textColorDefault: siteVars.colors.grey.dark02,
  textColorDefaultHoverFocus: siteVars.colors.white,
  textColorChecked: siteVars.colors.white,

  iconBorderColorDefaultHover: siteVars.colors.white,
  iconBorderColorChecked: siteVars.brand06,

  iconBackgroundColorChecked: siteVars.brand06,
})
