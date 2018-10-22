import fontAwesomeIcons from './fontAwesomeIconStyles'
import { callable } from '../../../../lib'
import { disabledStyle } from '../../../../styles/customCSS'
import { ComponentSlotStylesInput, ICSSInJSStyle, FontIconSpec } from '../../../types'
import { ResultOf } from '../../../../../types/utils'
import { IconXSpacing, IconProps } from '../../../../components/Icon/Icon'
import { pxToRem } from './../../../../lib'
import { getStyle as getSvgStyle } from './svg'

const sizes = new Map([
  ['micro', [10, 10]],
  ['mini', [12, 10]],
  ['tiny', [14, 10]],
  ['small', [24, 12]],
  ['normal', [32, 16]],
  ['large', [32, 20]],
  ['big', [40, 20]],
  ['huge', [64, 52]],
  ['massive', [72, 64]],
])

const getDefaultFontIcon = (iconName: string) => {
  return callable(fontAwesomeIcons(iconName).icon)()
}

const getFontStyles = (iconName: string, themeIcon?: ResultOf<FontIconSpec>): ICSSInJSStyle => {
  const { fontFamily, content } = themeIcon || getDefaultFontIcon(iconName)

  return {
    fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    textDecoration: 'inherit',
    textAlign: 'center',

    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    backfaceVisibility: 'hidden',

    lineHeight: 1,

    '::before': {
      content,
      boxSizing: 'inherit',
      background: '0 0',
    },
  }
}

const getXSpacingStyles = (
  xSpacing: IconXSpacing,
  iconSpaceRems: string,
  iconPadding: string,
): ICSSInJSStyle => {
  switch (xSpacing) {
    case 'none':
      return {
        margin: `-${iconPadding}`,
      }
    case 'before':
      return {
        margin: `-${iconPadding} -${iconPadding} -${iconPadding} ${iconSpaceRems}`,
      }
    case 'after':
      return {
        margin: `-${iconPadding} ${iconSpaceRems} -${iconPadding} -${iconPadding}`,
      }
    case 'both':
      return {
        margin: `-${iconPadding} ${iconSpaceRems}`,
      }
    case 'all':
      return {
        margin: 0,
      }
    default:
      return {
        margin: `-${iconPadding}`,
      }
  }
}

const getBorderedStyles = (circular, borderColor, color): ICSSInJSStyle => {
  return {
    // TODO: "black" here should actually match the Icon's fill or text color
    boxShadow: `0 0 0 0.05em ${borderColor || color || 'black'} inset`,
    margin: 0,
    ...(circular ? { borderRadius: '50%' } : {}),
  }
}

const iconStyles: ComponentSlotStylesInput<IconProps, any> = {
  root: ({
    props: { disabled, name, size, bordered, circular, xSpacing },
    variables: v,
    theme,
  }): ICSSInJSStyle => {
    const iconSpec = theme.icons[name]
    const isFontBased = !iconSpec || !iconSpec.isSvg

    const sizeData = sizes.get(size)
    const svgSize = sizeData[0]
    const iconSize = sizeData[1]
    const iconPadding = (svgSize - iconSize) / 2
    const iconPaddingRems = pxToRem(iconPadding)
    const iconSpaceRems = pxToRem(v.horizontalSpace - iconPadding)

    return {
      display: 'inline-block',

      width: pxToRem(svgSize),
      height: pxToRem(svgSize),

      ...(isFontBased &&
        getFontStyles(name, callable(iconSpec && (iconSpec.icon as FontIconSpec))())),

      ...(isFontBased && {
        color: v.color,
        fontSize: pxToRem(iconSize),
        padding: iconPaddingRems,
      }),
      backgroundColor: v.backgroundColor,

      opacity: 1,

      speak: 'none',

      verticalAlign: 'middle',
      overflow: 'hidden',

      ...getXSpacingStyles(xSpacing, iconSpaceRems, iconPaddingRems),

      ...((bordered || v.borderColor || circular) &&
        getBorderedStyles(circular, v.borderColor, v.color)),

      ...(disabled && disabledStyle),
    }
  },

  svg: getSvgStyle('svg'),

  g: getSvgStyle('g'),

  /* additional SVG styles for different paths could be added/used in the same way */
  path: getSvgStyle('path'),
  secondaryPath: getSvgStyle('secondaryPath'),
}

export default iconStyles
