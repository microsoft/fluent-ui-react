import fontAwesomeIcons from './fontAwesomeIconStyles'
import { callable } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle, FontIconSpec } from '../../../../../types/theme'
import { ResultOf } from '../../../../../types/utils'
import { IconXSpacing, IIconProps } from '../../../../components/Icon/Icon'
import { pxToRem } from './../../../../lib'

import { getStyle as getSvgStyle } from './svg'

const sizes = new Map([
  ['micro', 10],
  ['mini', 12],
  ['tiny', 14],
  ['small', 28],
  ['normal', 32],
  ['large', 34],
  ['big', 50],
  ['huge', 64],
  ['massive', 78],
])

const svgDefaultPadding = 8

const getDefaultFontIcon = (iconName: string) => {
  return callable(fontAwesomeIcons(iconName).icon)()
}

const getFontStyles = (iconName: string, themeIcon?: ResultOf<FontIconSpec>): ICSSInJSStyle => {
  const { fontFamily, content } = themeIcon || getDefaultFontIcon(iconName)

  return {
    display: 'inline-block',
    fontFamily,
    textAlign: 'center',
    lineHeight: 1,
    speak: 'none',

    '::before': {
      content,
    },
  }
}

const getXSpacingStyles = (xSpacing: IconXSpacing, horizontalSpace: number): ICSSInJSStyle => {
  switch (xSpacing) {
    case 'none':
      return {
        margin: `-${pxToRem(svgDefaultPadding)}`,
      }
    case 'before':
      return {
        margin: `-${pxToRem(svgDefaultPadding)} -${pxToRem(svgDefaultPadding)} -${pxToRem(
          svgDefaultPadding,
        )} ${pxToRem(horizontalSpace - svgDefaultPadding)}`,
      }
    case 'after':
      return {
        margin: `-${pxToRem(svgDefaultPadding)} ${pxToRem(
          horizontalSpace - svgDefaultPadding,
        )} -${pxToRem(svgDefaultPadding)} -${pxToRem(svgDefaultPadding)}`,
      }
    case 'both':
      return {
        margin: `0 ${pxToRem(horizontalSpace - svgDefaultPadding)}`,
      }
  }
}

const getBorderedStyles = (isFontBased, circular, borderColor, color): ICSSInJSStyle => {
  return {
    margin: `0 ${pxToRem(3)} 0 0`,
    boxShadow: `0 0 0 0.05em ${borderColor || color || 'black'} inset`,
    ...(isFontBased && {
      paddingTop: pxToRem(svgDefaultPadding),
      paddingBottom: pxToRem(svgDefaultPadding),
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

      background: v.backgroundColor,

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
        width: pxToRem(sizes.get(size)),
        height: pxToRem(sizes.get(size)),
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
