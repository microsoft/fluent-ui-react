import { pxToRem } from '../../../../lib'

export interface CheckboxVariables {
  checkboxTextColor: string
  checkboxBackground: string
  checkboxBorderColor: string
  checkboxBorderStyle: string
  checkboxBorderRadius: string
  checkboxBorderWidth: string
  checkboxIndicatorColor: string
  checkboxGap: string
  checkboxMargin: string
  checkboxPadding: string
  rootPadding: string

  checkboxTextColorHover: string
  checkboxBorderColorHover: string
  checkedCheckboxBackgroundHover: string

  toggleBorderRadius: string
  toggleIndicatorColor: string
  toggleMargin: string
  togglePadding: string

  checkboxCheckedTextColor: string
  checkedCheckboxBackground: string
  checkedCheckboxBorderColor: string
  checkboxCheckedIndicatorColor: string
  toggleCheckedPadding: string

  disabledColor: string
  disabledCheckboxBackground: string
  disabledCheckboxBackgroundChecked: string
  disabledCheckboxBorderColor: string
  disabledcheckboxCheckedIndicatorColor: string
  disabledtoggleIndicatorColor: string
}

const [toggleMovementDistance, checkboxPadding] = [20, 2].map(v => pxToRem(v))

export default (siteVars: any): CheckboxVariables => ({
  checkboxTextColor: siteVars.colorScheme.default.foreground1,
  checkboxBackground: siteVars.colorScheme.default.background,
  checkboxBorderColor: siteVars.colorScheme.default.foreground1,
  checkboxBorderStyle: 'solid',
  checkboxBorderRadius: pxToRem(3),
  checkboxBorderWidth: pxToRem(1),
  checkboxIndicatorColor: 'transparent',
  checkboxGap: pxToRem(12),
  checkboxMargin: `${pxToRem(20)}, 0`,
  checkboxPadding,
  rootPadding: '4px 5px',

  checkboxTextColorHover: siteVars.colorScheme.default.foreground,
  checkboxBorderColorHover: siteVars.colorScheme.default.foreground,
  checkedCheckboxBackgroundHover: siteVars.colors.brand[600],

  toggleBorderRadius: pxToRem(999),
  toggleIndicatorColor: siteVars.colors.brand[600],
  toggleMargin: `${pxToRem(20)}, 0`,
  togglePadding: `${checkboxPadding} ${toggleMovementDistance} ${checkboxPadding} ${checkboxPadding}`,

  checkboxCheckedTextColor: siteVars.colorScheme.default.foreground,
  checkedCheckboxBackground: siteVars.colors.brand[600],
  checkedCheckboxBorderColor: 'transparent',
  checkboxCheckedIndicatorColor: siteVars.colors.white,
  toggleCheckedPadding: `${checkboxPadding} ${checkboxPadding} ${checkboxPadding} ${toggleMovementDistance}`,

  disabledColor: siteVars.colorScheme.default.foregroundDisabled1,
  disabledCheckboxBackground: siteVars.colorScheme.default.background,
  disabledCheckboxBackgroundChecked: siteVars.colorScheme.default.backgroundDisabled,
  disabledCheckboxBorderColor: siteVars.colorScheme.default.foregroundDisabled1,
  disabledcheckboxCheckedIndicatorColor: siteVars.colorScheme.default.foregroundDisabled1,
  disabledtoggleIndicatorColor: siteVars.colorScheme.default.foregroundDisabled1,
})
