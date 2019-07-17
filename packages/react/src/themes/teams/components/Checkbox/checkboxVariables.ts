import { pxToRem } from '../../../../lib'

export interface CheckboxVariables {
  rootPadding: string

  textColor: string
  background: string
  borderColor: string
  borderStyle: string
  borderRadius: string
  borderWidth: string
  indicatorColor: string
  gap: string
  margin: string
  padding: string

  textColorHover: string
  borderColorHover: string
  checkedBackgroundHover: string
  checkedTextColor: string
  checkedBackground: string
  checkedBorderColor: string
  checkedIndicatorColor: string

  toggleBorderRadius: string
  toggleIndicatorSize: string
  toggleMargin: string
  togglePadding: string
  toggleCheckedPadding: string

  disabledColor: string
  disabledBackground: string
  disabledBackgroundChecked: string
  disabledBorderColor: string
  disabledCheckedIndicatorColor: string
  disabledToggleIndicatorColor: string
}

const [toggleMovementDistance, padding] = [20, 2].map(v => pxToRem(v))

export default (siteVars: any): CheckboxVariables => ({
  textColor: siteVars.colorScheme.default.foreground1,
  background: siteVars.colorScheme.default.background,
  borderColor: siteVars.colorScheme.default.foreground1,
  borderStyle: 'solid',
  borderRadius: pxToRem(3),
  borderWidth: pxToRem(1),
  indicatorColor: 'transparent',
  gap: pxToRem(12),
  margin: `${pxToRem(20)}, 0`,
  padding,
  rootPadding: '3px 5px',

  textColorHover: siteVars.colorScheme.default.foreground,
  borderColorHover: siteVars.colorScheme.default.foreground,
  checkedBackgroundHover: siteVars.colorScheme.brand.backgroundHover,

  toggleBorderRadius: pxToRem(999),
  toggleIndicatorSize: pxToRem(14),
  toggleMargin: `${pxToRem(20)}, 0`,
  togglePadding: `${padding} ${toggleMovementDistance} ${padding} ${padding}`,

  checkedTextColor: siteVars.colorScheme.default.foreground,
  checkedBackground: siteVars.colorScheme.brand.backgroundActive1,
  checkedBorderColor: 'transparent',
  checkedIndicatorColor: siteVars.colorScheme.default.background,
  toggleCheckedPadding: `${padding} ${padding} ${padding} ${toggleMovementDistance}`,

  disabledColor: siteVars.colorScheme.default.foregroundDisabled1,
  disabledBackground: siteVars.colorScheme.default.background,
  disabledBackgroundChecked: siteVars.colorScheme.default.backgroundDisabled,
  disabledBorderColor: siteVars.colorScheme.default.foregroundDisabled1,
  disabledCheckedIndicatorColor: siteVars.colorScheme.default.foregroundDisabled,
  disabledToggleIndicatorColor: siteVars.colorScheme.default.foregroundDisabled,
})
