import { RadioGroupItemVariables } from 'src/themes/teams/components/RadioGroup/radioGroupItemVariables'

export default (siteVars: any): Partial<RadioGroupItemVariables> => ({
  textColorDefault: siteVars.colors.grey[250],
  textColorDefaultHoverFocus: siteVars.colors.white,
  textColorChecked: siteVars.colors.white,

  iconBorderColorDefaultHover: siteVars.colors.white,
  iconBorderColorChecked: siteVars.colors.primary[400],

  iconBackgroundColorChecked: siteVars.colors.primary[400],
})
