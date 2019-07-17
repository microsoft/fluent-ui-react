import { pxToRem } from '../../../../lib'

export type CheckboxVariables = {
  background: string
  borderColor: string
  borderStyle: string
  borderRadius: string
  borderWidth: string
  checkboxColor: string
  gap: string
  margin: string
  padding: string

  checkboxToggleBackground: string
  toggleBorderColor: string
  toggleBorderStyle: string
  toggleBorderRadius: string
  toggleBorderWidth: string
  toggleIndicatorColor: string
  toggleMargin: string
  togglePadding: string

  checkedBackground: string
  checkedBorderColor: string
  checkboxCheckedColor: string
  checkboxToggleCheckedColor: string
  checkboxToggleCheckedBackground: string
  checkboxToggleCheckedBorderColor: string
  toggleCheckedPadding: string

  disabledColor: string
  disabledBackground: string
  disabledBorderColor: string
  disabledCheckboxColor: string
  disabledToggleIndicatorColor: string
  disabledcheckboxToggleBackground: string
  disabledToggleBorderColor: string
}

export default (siteVars: any): CheckboxVariables => ({
  background: 'transparent',
  borderColor: siteVars.colors.grey[300],
  borderStyle: `solid`,
  borderRadius: pxToRem(4),
  borderWidth: pxToRem(1),
  checkboxColor: 'transparent',
  gap: pxToRem(12),
  margin: '0',
  padding: '0',

  checkboxToggleBackground: 'transparent',
  toggleBorderColor: siteVars.colors.grey[300],
  toggleBorderStyle: `solid`,
  toggleBorderRadius: pxToRem(999),
  toggleBorderWidth: pxToRem(1),
  toggleIndicatorColor: 'inherit',
  toggleMargin: '0',
  togglePadding: `0 ${pxToRem(20)} 0 0`,

  checkedBackground: 'transparent',
  checkedBorderColor: siteVars.colors.grey[500],
  checkboxCheckedColor: siteVars.colors.grey[500],
  checkboxToggleCheckedBackground: 'transparent',
  checkboxToggleCheckedBorderColor: siteVars.colors.grey[500],
  checkboxToggleCheckedColor: 'inherit',
  toggleCheckedPadding: `0 0 0 ${pxToRem(20)}`,

  disabledColor: siteVars.colors.grey[300],
  disabledBackground: siteVars.colors.grey[200],
  disabledBorderColor: siteVars.colors.grey[100],
  disabledCheckboxColor: siteVars.colors.grey[300],
  disabledcheckboxToggleBackground: 'transparent',
  disabledToggleBorderColor: siteVars.colors.grey[200],
  disabledToggleIndicatorColor: siteVars.colors.grey[300],
})
