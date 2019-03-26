import * as _ from 'lodash'

import fontAwesomeIcons from './fontAwesomeIconStyles'
import { callable, pxToRem, SizeValue } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle, FontIconSpec } from '../../../types'
import { ResultOf } from '../../../../types'
import { IconXSpacing, IconProps } from '../../../../components/Icon/Icon'
import { getStyle as getSvgStyle } from './svg'
import { IconVariables, IconSizeModifier } from './iconVariables'

const sizes: Record<SizeValue, number> = {
  smallest: 7,
  smaller: 10,
  small: 12,
  medium: 16,
  large: 20,
  larger: 32,
  largest: 40,
}

const getDefaultFontIcon = (iconName: string) => {
  return callable(fontAwesomeIcons(iconName).icon)()
}

const getFontStyles = (
  size: number,
  iconName: string,
  themeIcon?: ResultOf<FontIconSpec>,
): ICSSInJSStyle => {
  const { fontFamily, content } = themeIcon || getDefaultFontIcon(iconName)
  const sizeInRems = pxToRem(size)

  return {
    fontFamily,
    fontSize: sizeInRems,
    lineHeight: 1,

    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',

    boxSizing: 'content-box',
    width: sizeInRems,
    height: sizeInRems,

    '::before': {
      content,
    },
  }
}

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

const getIconSize = (size: SizeValue, sizeModifier: IconSizeModifier): number => {
  if (!sizeModifier) {
    return sizes[size]
  }

  const modifiedSizes = {
    large: {
      x: 24,
      xx: 28,
    },
  }

  return modifiedSizes[size] && modifiedSizes[size][sizeModifier]
}

const getIconColor = (colorProp: string, variables: IconVariables) =>
  _.get(variables.colors, colorProp, variables.color || 'currentColor')

const iconStyles: ComponentSlotStylesInput<IconProps, IconVariables> = {
  root: ({
    props: { disabled, name, size, bordered, circular, color, xSpacing, rotate },
    variables: v,
    theme,
  }): ICSSInJSStyle => {
    const iconSpec = theme.icons[name]
    const rtl = theme.rtl
    const isFontBased = name && (!iconSpec || !iconSpec.isSvg)

    return {
      backgroundColor: v.backgroundColor,
      display: 'inline-block',
      speak: 'none',
      verticalAlign: 'middle',

      ...(isFontBased && getFontStyles(getIconSize(size, v.sizeModifier), name)),

      ...(isFontBased && {
        color: getIconColor(color, v),
        fontWeight: 900, // required for the fontAwesome to render

        ...(disabled && {
          color: v.disabledColor,
        }),
      }),

      ...getXSpacingStyles(xSpacing, v.horizontalSpace),

      ...(circular && { ...getPaddedStyle(), borderRadius: '50%' }),

      ...((bordered || v.borderColor) &&
        getBorderedStyles(v.borderColor || getIconColor(color, v))),

      ...(!rtl && {
        transform: `rotate(${rotate}deg)`,
      }),
    }
  },

  flipInRtl: ({ props: p, theme: { rtl } }) => ({
    ...(rtl && {
      transform: `scaleX(-1) rotate(${-1 * p.rotate}deg)`,
    }),
  }),

  outlinePart: ({ props: p }): ICSSInJSStyle => {
    return {
      display: 'none',

      ...(p.outline && {
        display: 'block',
      }),
    }
  },

  filledPart: ({ props: p }): ICSSInJSStyle => {
    return {
      ...(p.outline && {
        display: 'none',
      }),
    }
  },

  svg: ({ props: { size, color, disabled }, variables: v }): ICSSInJSStyle => {
    const iconSizeInRems = pxToRem(getIconSize(size, v.sizeModifier))

    return {
      display: 'block',
      width: iconSizeInRems,
      height: iconSizeInRems,
      fill: getIconColor(color, v),

      ...(disabled && {
        fill: v.disabledColor,
      }),

      ...getSvgStyle('svg'),
    }
  },

  g: getSvgStyle('g'),

  path: getSvgStyle('path'),

  secondaryPath: getSvgStyle('secondaryPath'),
}

export default iconStyles
