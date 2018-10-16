import fontAwesomeIcons from './fontAwesomeIconStyles'
import { callable } from '../../../../lib'
import { disabledStyle, fittedStyle } from '../../../../styles/customCSS'
import { IComponentPartStylesInput, ICSSInJSStyle, FontIconSpec } from '../../../../../types/theme'
import { ResultOf } from '../../../../../types/utils'
import { IconXSpacing, IIconProps } from '../../../../components/Icon/Icon'

import { getStyle as getSvgStyle } from './svg'

const sizes = new Map([
  ['micro', 0.3],
  ['mini', 0.4],
  ['tiny', 0.5],
  ['small', 0.75],
  ['normal', 1],
  ['large', 1.5],
  ['big', 2],
  ['huge', 4],
  ['massive', 8],
])

const getDefaultFontIcon = (iconName: string) => {
  return callable(fontAwesomeIcons(iconName).icon)()
}

const getSize = size => `${sizes.get(size)}em`

const getFontStyles = (iconName: string, themeIcon?: ResultOf<FontIconSpec>): ICSSInJSStyle => {
  const { fontFamily, content } = themeIcon || getDefaultFontIcon(iconName)

  return {
    fontFamily,
    width: '1.18em',
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

const getBorderedStyles = (isFontBased, circular, borderColor, color): ICSSInJSStyle => {
  return {
    ...getPaddedStyle(isFontBased),

    // TODO: "black" here should actually match the Icon's fill or text color
    boxShadow: `0 0 0 0.05em ${borderColor || color || 'black'} inset`,
    ...(circular ? { borderRadius: '50%' } : {}),
  }
}

const getPaddedStyle = (isFontBased: boolean): ICSSInJSStyle => ({
  padding: `0.5em ${isFontBased ? 0 : '0.5em'}`,
  width: '2em',
  height: '2em',
})

const iconStyles: IComponentPartStylesInput<IIconProps, any> = {
  root: ({
    props: { disabled, name, size, bordered, circular, xSpacing },
    variables: v,
    theme,
  }): ICSSInJSStyle => {
    const iconSpec = theme.icons[name]
    const isFontBased = !iconSpec || !iconSpec.isSvg

    return {
      display: 'inline-block',
      fontSize: getSize(size),

      width: '1em',
      height: '1em',

      ...(isFontBased &&
        getFontStyles(name, callable(iconSpec && (iconSpec.icon as FontIconSpec))())),

      ...(isFontBased && { color: v.color }),
      backgroundColor: v.backgroundColor,

      opacity: 1,
      margin: v.margin,

      speak: 'none',

      verticalAlign: 'middle',
      overflow: 'hidden',

      ...getXSpacingStyles(xSpacing, v.horizontalSpace),

      ...((bordered || v.borderColor || circular) &&
        getBorderedStyles(isFontBased, circular, v.borderColor, v.color)),

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
