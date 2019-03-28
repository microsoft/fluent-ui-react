import * as _ from 'lodash'

import icons from './index'
import { callable, pxToRem, SizeValue } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle, FontIconSpec } from '../../../types'
import { ResultOf } from '../../../../types'
import { IconXSpacing, IconProps } from '../../../../components/Icon/Icon'
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
  return callable(icons(iconName).icon)()
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

const iconStyles: ComponentSlotStylesInput<IconProps, IconVariables> = {
  root: ({
    props: { name, size, bordered, circular, xSpacing, rotate },
    variables: v,
    theme,
  }): ICSSInJSStyle => {
    const iconSpec = theme.icons[name]
    const rtl = theme.rtl
    const isFontBased = name && (!iconSpec || !iconSpec.isSvg)

    return {
      display: 'inline-block',
      speak: 'none',
      verticalAlign: 'middle',

      boxSizing: 'content-box',

      ...(isFontBased && getFontStyles(getIconSize(size, v.sizeModifier), name)),

      ...getXSpacingStyles(xSpacing, v.horizontalSpace),

      ...(circular && { ...getPaddedStyle(), borderRadius: '50%' }),

      ...(bordered && getBorderedStyles(v.borderColor)),

      ...(rtl && {
        transform: rtl ? `scaleX(-1) rotate(${-1 * rotate}deg)` : `rotate(${rotate}deg)`,
      }),
    }
  },
}

export default iconStyles
