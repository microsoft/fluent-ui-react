import * as _ from 'lodash'

import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { LabelProps } from '../../../../components/Label/Label'
import { LabelVariables } from './labelVariables'

const getColorSchemeFromObject = (colorScheme, colors) => {
  const result = {}
  const keys = _.keys(colors)
  keys.forEach(key => {
    // if the color scheme contains the color, then get the value from it, otherwise return the color provided
    const colorSchemeValue = _.get(colorScheme, colors[key], colorScheme.default[colors[key]])
    result[key] = colorSchemeValue ? colorSchemeValue[key] : colors[key]
  })
  return result
}

const labelStyles: ComponentSlotStylesInput<LabelProps, LabelVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = _.isObject(p.color)
      ? { ...v.colorScheme.default, ...getColorSchemeFromObject(v.colorScheme, p.color) }
      : _.get(v.colorScheme, p.color as string, {
          ...v.colorScheme.default,
        })

    return {
      display: 'inline-flex',
      alignItems: 'center',
      overflow: 'hidden',
      height: v.height,
      lineHeight: v.height,
      color: colors.foreground,
      backgroundColor: colors.background,
      fontSize: pxToRem(14),
      borderRadius: pxToRem(3),
      padding: v.padding,
      ...(p.image &&
        (p.imagePosition === 'start'
          ? { paddingLeft: v.startPaddingLeft }
          : { paddingRight: v.endPaddingRight })),
      ...(p.circular && {
        borderRadius: v.circularRadius,
      }),
    }
  },

  image: ({ variables: v }): ICSSInJSStyle => ({
    height: v.height,
    width: v.height,
  }),

  icon: ({ props: p }): ICSSInJSStyle =>
    p.icon &&
    typeof p.icon === 'object' &&
    (p.icon as any).onClick && {
      cursor: 'pointer',
    },
}

export default labelStyles
