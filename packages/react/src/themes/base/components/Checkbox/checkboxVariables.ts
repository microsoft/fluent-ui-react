import { pxToRem } from '../../../../lib'

export type CheckboxVariables = {
  checkboxBackground: string
  checkboxBorderColor: string
  checkboxBorderStyle: string
  checkboxBorderRadius: string
  checkboxBorderWidth: string
  checkboxColor: string
  checkboxGap: string
  checkboxMargin: string
  checkboxPadding: string

  checkboxToggleBackground: string
  toggleBorderColor: string
  toggleBorderStyle: string
  toggleBorderRadius: string
  toggleBorderWidth: string
  toggleIndicatorColor: string
  toggleMargin: string
  togglePadding: string

  checkedCheckboxBackground: string
  checkedCheckboxBorderColor: string
  checkedCheckboxColor: string
  checkboxToggleCheckedColor: string
  checkboxToggleCheckedBackground: string
  checkboxToggleCheckedBorderColor: string
  toggleCheckedPadding: string

  disabledColor: string
  disabledCheckboxBackground: string
  disabledCheckboxBorderColor: string
  disabledCheckboxColor: string
  disabledtoggleIndicatorColor: string
  disabledcheckboxToggleBackground: string
  disabledToggleBorderColor: string

  padding: string
}

export default (siteVars: any): CheckboxVariables => ({
  checkboxBackground: 'transparent',
  checkboxBorderColor: siteVars.colors.grey[300],
  checkboxBorderStyle: `solid`,
  checkboxBorderRadius: pxToRem(4),
  checkboxBorderWidth: pxToRem(1),
  checkboxColor: 'transparent',
  checkboxGap: pxToRem(12),
  checkboxMargin: '0',
  checkboxPadding: '0',

  checkboxToggleBackground: 'transparent',
  toggleBorderColor: siteVars.colors.grey[300],
  toggleBorderStyle: `solid`,
  toggleBorderRadius: pxToRem(999),
  toggleBorderWidth: pxToRem(1),
  toggleIndicatorColor: 'inherit',
  toggleMargin: '0',
  togglePadding: `0 ${pxToRem(20)} 0 0`,

  checkedCheckboxBackground: 'transparent',
  checkedCheckboxBorderColor: siteVars.colors.grey[500],
  checkedCheckboxColor: siteVars.colors.grey[500],
  checkboxToggleCheckedBackground: 'transparent',
  checkboxToggleCheckedBorderColor: siteVars.colors.grey[500],
  checkboxToggleCheckedColor: 'inherit',
  toggleCheckedPadding: `0 0 0 ${pxToRem(20)}`,

  disabledColor: siteVars.colors.grey[300],
  disabledCheckboxBackground: siteVars.colors.grey[200],
  disabledCheckboxBorderColor: siteVars.colors.grey[100],
  disabledCheckboxColor: siteVars.colors.grey[300],
  disabledcheckboxToggleBackground: 'transparent',
  disabledToggleBorderColor: siteVars.colors.grey[200],
  disabledtoggleIndicatorColor: siteVars.colors.grey[300],

  padding: `0 ${pxToRem(4)}`,
})
