import * as _ from 'lodash'

import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { LabelProps } from '../../../../components/Label/Label'
import { LabelVariables } from './labelVariables'

const labelStyles: ComponentSlotStylesInput<LabelProps, LabelVariables> = {
  root: ({ props: p, variables: v, colors }): ICSSInJSStyle => {
    return {
      // Default Label styles
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

      // Label type: Badge
      ...(p.badge && {
        height: v.badgeHeight,
        lineHeight: v.badgeLineheight,
        color: p.color ? colors.foreground : v.badgeColor,
        borderRadius: v.badgeBorderRadius,
        padding: p.additionalContent ? v.badgePadding : v.badgePaddingWithoutAdditionalContent,
        ...(!p.icon && {
          padding: v.badgePaddingWithoutIcon,
        }),
      }),
    }
  },

  image: ({ variables: v }): ICSSInJSStyle => ({
    height: v.height,
    width: v.height,
  }),

  icon: ({ props: p, colors }): ICSSInJSStyle => {
    return {
      ...(p.icon &&
        typeof p.icon === 'object' &&
        (p.icon as any).onClick && {
          cursor: 'pointer',
        }),

      // Label type: Badge
      ...(p.badge && {
        marginRight: '5px',
        color: p.color ? colors.foreground : 'black',
      }),
    }
  },

  additionalContent: ({ variables: v, props: p, colors }): ICSSInJSStyle => ({
    borderLeft: `solid ${pxToRem(1)}`,
    borderColor: p.color ? colors.foreground : v.additionalContentBorderColor,
    height: pxToRem(16),
    marginLeft: '6px',
    paddingLeft: '6px',
  }),
}

export default labelStyles
