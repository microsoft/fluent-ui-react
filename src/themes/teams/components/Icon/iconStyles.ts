import * as _ from 'lodash'

import fontAwesomeIcons from './fontAwesomeIconStyles'
import { callable } from '../../../../lib'
import { ComponentSlotStylesInput, FontIconSpec, ICSSInJSStyle, PxToRemFunc } from '../../../types'
import { ResultOf } from '../../../../../types/utils'
import { IconXSpacing, IconProps, IconSize } from '../../../../components/Icon/Icon'
import { getStyle as getSvgStyle } from './svg'
import { IconVariables, IconSizeModifier } from './iconVariables'

const sizes: { [key in IconSize]: number } = {
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
  pxToRem: PxToRemFunc,
  themeIcon?: ResultOf<FontIconSpec>,
): ICSSInJSStyle => {
  const { fontFamily, content } = themeIcon || getDefaultFontIcon(iconName)
  const sizeInRems = pxToRem(size)

  return {
    fontFamily,
    fontSize: sizeInRems,
    lineHeight: 1,
    textAlign: 'center',

    '::before': {
      content,
      display: 'block',
      width: sizeInRems,
      height: sizeInRems,
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

const getBorderedStyles = (
  circular: boolean,
  boxShadowColor: string,
  pxToRem: PxToRemFunc,
): ICSSInJSStyle => {
  return {
    ...getPaddedStyle(pxToRem),

    boxShadow: `0 0 0 .05rem ${boxShadowColor} inset`,
    ...(circular ? { borderRadius: '50%' } : {}),
  }
}

const getPaddedStyle = (pxToRem: PxToRemFunc): ICSSInJSStyle => ({
  padding: pxToRem(4),
})

const getIconSize = (size: IconSize, sizeModifier: IconSizeModifier): number => {
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
    pxToRem,
  }): ICSSInJSStyle => {
    const iconSpec = theme.icons[name]
    const rtl = theme.rtl
    const isFontBased = !iconSpec || !iconSpec.isSvg

    return {
      backgroundColor: v.backgroundColor,
      display: 'inline-block',
      marginRight: v.marginRight,
      speak: 'none',
      verticalAlign: 'middle',

      ...(isFontBased && getFontStyles(getIconSize(size, v.sizeModifier), name, pxToRem)),

      ...(isFontBased && {
        color: getIconColor(color, v),

        ...(disabled && {
          color: v.disabledColor,
        }),
      }),

      ...getXSpacingStyles(xSpacing, v.horizontalSpace),

      ...((bordered || v.borderColor || circular) &&
        getBorderedStyles(circular, v.borderColor || getIconColor(color, v), pxToRem)),

      ...(rtl && {
        transform: `scaleX(-1) rotate(${-1 * rotate}deg)`,
      }),

      ...(!rtl && {
        transform: `rotate(${rotate}deg)`,
      }),
    }
  },

  outlinePart: ({ variables: v }): ICSSInJSStyle => {
    return {
      display: 'none',

      ...(v.outline && {
        display: 'block',
      }),
    }
  },

  filledPart: ({ variables: v }): ICSSInJSStyle => {
    return {
      ...(v.outline && {
        display: 'none',
      }),
    }
  },

  svg: ({ props: { size, color, disabled }, variables: v, pxToRem }): ICSSInJSStyle => {
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
