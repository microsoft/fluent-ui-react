import * as _ from 'lodash'

import fontAwesomeIcons from './fontAwesomeIconStyles'
import { callable, pxToRem, SizeValue } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle, FontIconSpec } from '../../../types'
import { ResultOf } from '../../../../types'
import { IconProps } from '../../../../components/Icon/Icon'
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

const getPaddedStyle = (): ICSSInJSStyle => ({
  padding: pxToRem(4),
})

const getBorderedStyles = (boxShadowColor: string): ICSSInJSStyle => {
  return {
    ...getPaddedStyle(),

    boxShadow: `0 0 0 .05rem ${boxShadowColor} inset`,
  }
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

    width: sizeInRems,
    height: sizeInRems,

    '::before': {
      content,
    },
  }
}

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
      boxSizing: isFontBased ? 'content-box' : 'border-box',

      ...(isFontBased && {
        ...getFontStyles(getIconSize(size, v.sizeModifier), name),
        fontWeight: 900, // required for the fontAwesome to render
        color: getIconColor(color, v),

        ...(disabled && {
          color: v.disabledColor,
        }),
      }),

      // overriding base theme border handling
      ...((bordered || v.borderColor) &&
        getBorderedStyles(v.borderColor || getIconColor(color, v))),

      // overriding the base theme default rtl behavior
      ...(rtl && {
        transform: 'unset',
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
