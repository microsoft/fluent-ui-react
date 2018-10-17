import fontAwesomeIcons from './fontAwesomeIconStyles'
import { callable } from '../../../../lib'
import { fittedStyle } from '../../../../styles/customCSS'
import { IComponentPartStylesInput, ICSSInJSStyle, FontIconSpec } from '../../../../../types/theme'
import { ResultOf } from '../../../../../types/utils'
import { IconXSpacing, IIconProps } from '../../../../components/Icon/Icon'
import { pxToRem } from './../../../../lib'

import { getStyle as getSvgStyle } from './svg'

const sizes = new Map([
  ['micro', 12],
  ['mini', 20],
  ['tiny', 24],
  ['small', 28],
  ['normal', 32],
  ['large', 34],
  ['big', 50],
  ['huge', 64],
  ['massive', 78],
])

const getDefaultFontIcon = (iconName: string) => {
  return callable(fontAwesomeIcons(iconName).icon)()
}

const getFontStyles = (iconName: string, themeIcon?: ResultOf<FontIconSpec>): ICSSInJSStyle => {
  const { fontFamily, content } = themeIcon || getDefaultFontIcon(iconName)

  return {
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    backfaceVisibility: 'hidden',
    fontFamily,
    textAlign: 'center',
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
    boxShadow: `0 0 0 0.05em ${borderColor || color || 'black'} inset`,
    ...(isFontBased && {
      paddingTop: pxToRem(8),
      paddingBottom: pxToRem(8),
    }),
    ...(circular ? { borderRadius: '50%' } : {}),
  }
}

const iconStyles: IComponentPartStylesInput<IIconProps, any> = {
  root: ({
    props: { disabled, name, size, bordered, circular, xSpacing },
    variables: v,
    theme,
  }): ICSSInJSStyle => {
    const iconSpec = theme.icons[name]
    const isFontBased = !iconSpec || !iconSpec.isSvg
    const iconColor = v.color || 'currentColor'

    return {
      display: 'inline-block',
      speak: 'none',
      verticalAlign: 'middle',
      overflow: 'hidden',
      width: pxToRem(sizes.get(size)),
      height: pxToRem(sizes.get(size)),

      ...(isFontBased &&
        getFontStyles(name, callable(iconSpec && (iconSpec.icon as FontIconSpec))())),

      ...(isFontBased && {
        color: v.color,
        fontSize: pxToRem(sizes.get(size) / 2),
        padding: pxToRem(sizes.get(size) / 4),

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

      ...((bordered || circular) &&
        getBorderedStyles(isFontBased, circular, v.borderColor, v.color)),
    }
  },

  svg: getSvgStyle('svg'),
  g: getSvgStyle('g'),
  path: getSvgStyle('path'),
  secondaryPath: getSvgStyle('secondaryPath'),
}

export default iconStyles
