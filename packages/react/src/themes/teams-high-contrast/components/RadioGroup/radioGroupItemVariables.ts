import { RadioGroupItemVariables } from 'src/themes/teams/components/RadioGroup/radioGroupItemVariables'

export default (siteVars: any): RadioGroupItemVariables => ({
  labelColorDefault: siteVars.white,
  labelColorChecked: siteVars.white,

  iconColorBorderDefault: siteVars.white,
  iconColorBorderChecked: siteVars.accessibleCyan,

  iconcolorBackgroundDefault: siteVars.white,
  iconColorBackgroundChecked: siteVars.accessibleCyan,
  iconColorBoxShadowFocus: siteVars.accessibleYellow,

  colorDisabled: siteVars.gray06,
})
