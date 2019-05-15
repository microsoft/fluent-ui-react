import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle, FontIconSpec } from '../../../types'
import { ResultOf } from '../../../../types'
import { IconXSpacing, IconProps } from '../../../../components/Icon/Icon'
import { IconVariables } from './iconVariables'
import { emptyIcon } from './iconNames'

const getXSpacingStyles = (xSpacing: IconXSpacing, horizontalSpace: string): ICSSInJSStyle => {
  switch (xSpacing) {
    case 'none':
      return { marginLeft: 0, marginRight: 0 }
    case 'before':
      return { marginLeft: horizontalSpace, marginRight: 0 }
    case 'after':
      return { marginLeft: 0, marginRight: horizontalSpace }
    case 'both':
      return { marginLeft: horizontalSpace, marginRight: horizontalSpace }
  }
}

const getBorderedStyles = (boxShadowColor: string): ICSSInJSStyle => {
  return {
    ...getPaddedStyle(),

    boxShadow: `0 0 0 .05rem ${boxShadowColor} inset`,
  }
}

const getPaddedStyle = (): ICSSInJSStyle => ({
  padding: pxToRem(4),
})

const iconStyles: ComponentSlotStylesInput<IconProps, IconVariables> = {
  root: ({ props: p, variables: v, theme: t }): ICSSInJSStyle => {
    const iconSpec = t.icons[p.name] || emptyIcon
    const icon = iconSpec.icon as ResultOf<FontIconSpec>

    return {
      alignItems: 'center',
      boxSizing: 'content-box',
      display: 'inline-flex',
      justifyContent: 'center',
      speak: 'none',
      verticalAlign: 'middle',

      '[data-icon-type="font"]': {
        fontFamily: icon.fontFamily,
        fontSize: pxToRem(16),
        lineHeight: 1,
        width: pxToRem(16),
        height: pxToRem(16),
      },

      '::before': {
        content: icon.content,
      },

      ...getXSpacingStyles(p.xSpacing, v.horizontalSpace),

      ...(p.bordered && getBorderedStyles(v.borderColor)),
      ...(p.circular && { ...getPaddedStyle(), borderRadius: '50%' }),
      ...(p.disabled && {
        color: v.disabledColor,
      }),

      transform: t.rtl ? `scaleX(-1) rotate(${-1 * p.rotate}deg)` : `rotate(${p.rotate}deg)`,
    }
  },
}

export default iconStyles
