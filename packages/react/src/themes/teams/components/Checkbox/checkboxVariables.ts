import { CheckboxVariables as BaseCheckboxVariables } from '../../../base/components/Checkbox/checkboxVariables'
import { pxToRem } from '../../../../lib'

export type CheckboxVariables = Partial<BaseCheckboxVariables> & {
  rootPadding: string

  textColor: string
  indicatorColor: string

  textColorHover: string
  borderColorHover: string
  checkedBackgroundHover: string
  checkedTextColor: string
  checkedIndicatorColor: string

  toggleIndicatorSize: string
  toggleCheckedPadding: string

  disabledBackgroundChecked: string
  disabledCheckedIndicatorColor: string
}

const toggleMovementDistance = pxToRem(20)
const padding = pxToRem(2)

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
