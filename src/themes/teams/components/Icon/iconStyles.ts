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
  size: string,
  iconName: string,
  themeIcon?: ResultOf<FontIconSpec>,
): ICSSInJSStyle => {
  const { fontFamily, content } = themeIcon || getDefaultFontIcon(iconName)

  return {
    fontFamily,
    fontWeight: 900,
    fontSize: getSize(size),
    lineHeight: 1,
    textAlign: 'center',

    '::before': {
      content,
      display: 'block',
      width: getSize(size),
      height: getSize(size),
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

const getSize = size => pxToRem(sizes.get(size))

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

      ...(isFontBased &&
        getFontStyles(size, name, callable(iconSpec && (iconSpec.icon as FontIconSpec))())),

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
    return {
      display: 'block',
      width: getSize(size),
      height: getSize(size),
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
