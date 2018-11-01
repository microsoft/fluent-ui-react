import fontAwesomeIcons from './fontAwesomeIconStyles'
import { callable } from '../../../../lib'
import { fittedStyle } from '../../../../styles/customCSS'
import { ComponentSlotStylesInput, ICSSInJSStyle, FontIconSpec } from '../../../types'
import { ResultOf } from '../../../../../types/utils'
import { IconXSpacing, IconProps } from '../../../../components/Icon/Icon'

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
    textAlign: 'center',
    lineHeight: 1,
    width: '1.18em',

    '::before': {
      content,
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

    boxShadow: `0 0 0 0.05em ${borderColor || color || 'black'} inset`,
    ...(circular ? { borderRadius: '50%' } : {}),
  }
}

const getPaddedStyle = (isFontBased: boolean): ICSSInJSStyle => ({
  padding: `0.5em ${isFontBased ? 0 : '0.5em'}`,
  width: '2em',
  height: '2em',
})

const iconStyles: ComponentSlotStylesInput<IconProps, any> = {
  root: ({
    props: { disabled, name, size, bordered, circular, xSpacing },
    variables: v,
    theme,
  }): ICSSInJSStyle => {
    const iconSpec = theme.icons[name]
    const isFontBased = !iconSpec || !iconSpec.isSvg
    const iconColor = v.color || 'currentColor'

    return {
      backgroundColor: v.backgroundColor,
      display: 'inline-block',
      fontSize: getSize(size),
      margin: v.margin,
      speak: 'none',
      verticalAlign: 'middle',
      overflow: 'hidden',
      width: '1em',
      height: '1em',

      ...(isFontBased &&
        getFontStyles(name, callable(iconSpec && (iconSpec.icon as FontIconSpec))())),

      ...(isFontBased && {
        color: iconColor,

        ...(disabled && {
          color: v.disabledColor,
        }),
      }),

      ...(!isFontBased && {
        fill: iconColor,

        ...(disabled && {
          fill: v.disabledColor,
        }),
      }),

      ...getXSpacingStyles(xSpacing, v.horizontalSpace),

      ...((bordered || v.borderColor || circular) &&
        getBorderedStyles(isFontBased, circular, v.borderColor, v.color)),
    }
  },

  svg: getSvgStyle('svg'),

  g: getSvgStyle('g'),

  path: getSvgStyle('path'),

  secondaryPath: getSvgStyle('secondaryPath'),

  unfilled: getSvgStyle('unfilled'),
  filled: getSvgStyle('filled'),
}

export default iconStyles
