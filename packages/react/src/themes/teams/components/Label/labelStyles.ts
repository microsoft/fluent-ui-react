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
      height: v.height.mini,
      lineHeight: v.height.mini,
      color: colors.foreground,
      backgroundColor: colors.background,
      fontSize: pxToRem(14),
      borderRadius: pxToRem(3),
      padding: v.padding.mini,
      margin: v.margin,
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
        backgroundColor: p.color ? colors.background : v.badgeBackgroundColor,
        padding: p.detail ? v.badgePadding : v.badgePaddingWithoutdetail,
        ...(!p.icon && {
          padding: v.badgePaddingWithoutIcon,
        }),
      }),

      // Size
      ...(p.size && {
        padding: v.padding[p.size],
        height: v.height[p.size],
        lineHeight: v.height[p.size],
      }),
    }
  },

  image: ({ variables: v }): ICSSInJSStyle => ({
    height: v.height.mini,
    width: v.height.mini,
  }),

  icon: ({ props: p, variables: v, colors }): ICSSInJSStyle => {
    return {
      ...(p.icon &&
        typeof p.icon === 'object' &&
        (p.icon as any).onClick && {
          cursor: 'pointer',
        }),

      // Label type: Badge
      ...(p.badge && {
        ...(p.iconPosition === 'start'
          ? { marginRight: v.badgeIconMargin }
          : { marginLeft: v.badgeIconMargin }),
        color: p.color ? colors.foreground : v.badgeColor,
      }),
    }
  },

  detail: ({ variables: v, props: p, colors }): ICSSInJSStyle => ({
    borderLeft: v.detailLeftBorder,
    borderColor: p.color ? colors.foreground : v.detailBorderColor,
    marginLeft: v.detailMarginLeft,
    paddingLeft: v.detailPaddingLeft,
  }),
}

export default labelStyles
