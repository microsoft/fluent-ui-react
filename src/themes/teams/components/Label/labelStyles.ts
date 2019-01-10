import * as _ from 'lodash'

import { pxToRem } from '../../utils'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { LabelProps } from '../../../../components/Label/Label'
import { LabelVariables } from './labelVariables'

const labelStyles: ComponentSlotStylesInput<LabelProps, LabelVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colorsComponentVariables = {
      foreground: v.foreground,
      background: v.background,
    }
    const colors = _.isObject(p.color)
      ? { ...v.colorScheme.default, ...colorsComponentVariables, ...(p.color as object) }
      : _.get(v.colorScheme, p.color as string, {
          ...v.colorScheme.default,
          ...colorsComponentVariables,
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
