import fontAwesomeIcons from './fontAwesomeIconStyles'
import { callable } from '../../../../lib'
import { fittedStyle } from '../../../../styles/customCSS'
import { ComponentSlotStylesInput, ICSSInJSStyle, FontIconSpec } from '../../../types'
import { ResultOf } from '../../../../../types/utils'
import { IconXSpacing, IconProps } from '../../../../components/Icon/Icon'
import { pxToRem } from '../../utils'
import { getStyle as getSvgStyle } from './svg'

const sizes = new Map([
  ['micro', 7],
  ['mini', 10],
  ['tiny', 12],
  ['small', 14],
  ['normal', 16],
  ['large', 20],
  ['big', 32],
  ['huge', 40],
  ['massive', 64],
])

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
      return fittedStyle
    case 'before':
      return { ...fittedStyle, marginLeft: horizontalSpace }
    case 'after':
      return { ...fittedStyle, marginRight: horizontalSpace }
    case 'both':
      return { ...fittedStyle, margin: `0 ${horizontalSpace}` }
  }
}

const getBorderedStyles = (circular, boxShadowColor): ICSSInJSStyle => {
  return {
    ...getPaddedStyle(),

    boxShadow: `0 0 0 .05rem ${boxShadowColor} inset`,
    ...(circular ? { borderRadius: '50%' } : {}),
  }
}

const getPaddedStyle = (): ICSSInJSStyle => ({
  padding: pxToRem(4),
})

const getIconSize = (size, sizeModifier): number => {
  if (!sizeModifier) {
    return sizes.get(size)
  }
  const modifiedSizes = {
    large: {
      x: 24,
      xx: 28,
    },
  }

  return modifiedSizes[size] && modifiedSizes[size][sizeModifier]
}

const getIconColor = color => color || 'currentColor'

const iconStyles: ComponentSlotStylesInput<IconProps, any> = {
  root: ({
    props: { disabled, name, size, bordered, circular, xSpacing },
    variables: v,
    theme,
  }): ICSSInJSStyle => {
    const iconSpec = theme.icons[name]
    const isFontBased = !iconSpec || !iconSpec.isSvg

    return {
      backgroundColor: v.backgroundColor,
      display: 'inline-block',
      margin: v.margin,
      speak: 'none',
      verticalAlign: 'middle',

      ...(isFontBased && getFontStyles(getIconSize(size, v.sizeModifier), name)),

      ...(isFontBased && {
        color: getIconColor(v.color),

        ...(disabled && {
          color: v.disabledColor,
        }),
      }),

      ...getXSpacingStyles(xSpacing, v.horizontalSpace),

      ...((bordered || v.borderColor || circular) &&
        getBorderedStyles(circular, v.borderColor || getIconColor(v.color))),
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

  svg: ({ props: { size, disabled }, variables: v }): ICSSInJSStyle => {
    const iconSizeInRems = pxToRem(getIconSize(size, v.sizeModifier))

    return {
      display: 'block',
      width: iconSizeInRems,
      height: iconSizeInRems,
      fill: getIconColor(v.color),

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
