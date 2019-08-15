import { CheckboxVariables as BaseCheckboxVariables } from '../../../base/components/Checkbox/checkboxVariables'
import { pxToRem } from '../../../../lib'
import * as _ from 'lodash'

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
const defaultValue = 'red'

export default (siteVars: any): CheckboxVariables => ({
  textColor: _.get(siteVars, 'colorScheme.default.foreground1', defaultValue),
  background: 'transparent',
  borderColor: _.get(siteVars, 'colorScheme.default.foreground1', defaultValue),
  borderStyle: 'solid',
  borderRadius: pxToRem(3),
  borderWidth: pxToRem(1),
  indicatorColor: 'transparent',
  gap: pxToRem(12),
  margin: `${pxToRem(20)}, 0`,
  padding,
  rootPadding: '3px 5px',

  textColorHover: _.get(siteVars, 'colorScheme.default.foreground', defaultValue),
  borderColorHover: _.get(siteVars, 'colorScheme.default.foreground', defaultValue),
  checkedBackgroundHover: _.get(siteVars, 'colorScheme.brand.backgroundHover', defaultValue),

  toggleBorderRadius: pxToRem(999),
  toggleIndicatorSize: pxToRem(14),
  toggleMargin: `${pxToRem(20)}, 0`,
  togglePadding: `${padding} ${toggleMovementDistance} ${padding} ${padding}`,

  checkedTextColor: _.get(siteVars, 'colorScheme.default.foreground', defaultValue),
  checkedBackground: _.get(siteVars, 'colorScheme.brand.backgroundActive1', defaultValue),
  checkedBorderColor: 'transparent',
  checkedIndicatorColor: _.get(siteVars, 'colorScheme.default.background', defaultValue),
  toggleCheckedPadding: `${padding} ${padding} ${padding} ${toggleMovementDistance}`,

  disabledBackground: _.get(siteVars, 'colorScheme.default.background', defaultValue),
  disabledBackgroundChecked: _.get(
    siteVars,
    'colorScheme.default.backgroundDisabled',
    defaultValue,
  ),
  disabledBorderColor: _.get(siteVars, 'colorScheme.default.foregroundDisabled1', defaultValue),
  disabledCheckedIndicatorColor: _.get(
    siteVars,
    'colorScheme.default.foregroundDisabled',
    defaultValue,
  ),
  disabledToggleIndicatorColor: _.get(
    siteVars,
    'colorScheme.default.foregroundDisabled',
    defaultValue,
  ),
})
