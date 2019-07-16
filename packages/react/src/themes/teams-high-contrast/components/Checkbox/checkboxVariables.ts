import { CheckboxVariables } from '../../../teams/components/Checkbox/checkboxVariables'

export default (siteVars: any): Partial<CheckboxVariables> => {
  return {
    checkboxBorderColorHover: siteVars.accessibleYellow,
    checkboxCheckedBackground: siteVars.accessibleCyan,
    checkboxCheckedBackgroundHover: siteVars.accessibleYellow,
    checkboxCheckedIndicatorColor: siteVars.colors.black,

    toggleIndicatorColor: siteVars.colors.white,

    disabledCheckboxCheckedIndicatorColor: siteVars.colors.black,
    disabledToggleIndicatorColor: siteVars.colors.accessibleGreen,
  }
}
