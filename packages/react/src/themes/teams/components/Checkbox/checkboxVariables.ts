import { CheckboxVariables as BaseCheckboxVariables } from '../../../base/components/Checkbox/checkboxVariables'

export type CheckboxVariables = Partial<BaseCheckboxVariables>

export default (siteVars: any): CheckboxVariables => ({
  checkboxBorderColor: siteVars.colors.grey[750],

  toggleColor: siteVars.colors.brand[600],

  checkedCheckboxBackground: siteVars.colors.brand[600],
  checkedCheckboxBorderColor: siteVars.colors.brand[600],
  checkedCheckboxColor: siteVars.colors.white,
  checkedToggleBackground: siteVars.colors.brand[600],
  checkedToggleBorderColor: siteVars.colors.brand[600],
  checkedToggleColor: siteVars.colors.white,

  disabledColor: siteVars.colors.grey[250],
  disabledCheckboxBackground: siteVars.colors.grey[250],
  disabledCheckboxBorderColor: siteVars.colors.grey[250],
  disabledToggleBackground: siteVars.colors.grey[250],
  disabledToggleBorderColor: siteVars.colors.grey[250],
})
