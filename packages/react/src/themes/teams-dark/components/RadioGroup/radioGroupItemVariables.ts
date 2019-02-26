import { RadioGroupItemVariables } from 'src/themes/teams/components/RadioGroup/radioGroupItemVariables'

export default (siteVars: any): Partial<RadioGroupItemVariables> => {
  return {
    labelColorDefault: siteVars.gray02,
    labelColorChecked: siteVars.white,

    iconColorBorderDefault: siteVars.brand,
    iconColorBorderChecked: siteVars.brand,

    iconcolorBackgroundDefault: siteVars.white,
    iconColorBackgroundChecked: siteVars.brand,
    iconColorBoxShadowFocus: siteVars.brand06,

    colorDisabled: siteVars.gray06,
  }
}
