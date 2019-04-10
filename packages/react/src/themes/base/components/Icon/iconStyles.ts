import icons from './index'
import { callable, pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle, FontIconSpec } from '../../../types'
import { ResultOf } from '../../../../types'
import { IconXSpacing, IconProps } from '../../../../components/Icon/Icon'
import { IconVariables } from './iconVariables'

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

const iconStyles: ComponentSlotStylesInput<IconProps, IconVariables> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const iconSpec = theme.icons[p.name]
    const rtl = theme.rtl
    const isFontBased = p.name && (!iconSpec || !iconSpec.isSvg)

    return {
      display: 'inline-block',
      speak: 'none',
      verticalAlign: 'middle',

      boxSizing: 'content-box',

      ...(isFontBased && getFontStyles(16, p.name)),

      ...getXSpacingStyles(p.xSpacing, v.horizontalSpace),

      ...(p.circular && { ...getPaddedStyle(), borderRadius: '50%' }),

      ...(p.bordered && getBorderedStyles(v.borderColor)),

      transform: rtl ? `scaleX(-1) rotate(${-1 * p.rotate}deg)` : `rotate(${p.rotate}deg)`,
    }
  },
}

export default iconStyles
