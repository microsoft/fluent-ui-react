import * as _ from 'lodash'

import { callable, pxToRem, SizeValue } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { IconProps } from '../../../../components/Icon/Icon'
import { getStyle as getSvgStyle } from './svg'
import { IconVariables, IconSizeModifier } from './iconVariables'

const getPaddedStyle = (): ICSSInJSStyle => ({
  padding: pxToRem(4),
})

const getBorderedStyles = (boxShadowColor: string): ICSSInJSStyle => {
  return {
    ...getPaddedStyle(),

    boxShadow: `0 0 0 .05rem ${boxShadowColor} inset`,
  }
}

const getIconSize = (size: SizeValue, sizeModifier: IconSizeModifier, v: IconVariables): string => {
  if (!sizeModifier) {
    return v[`${size}Size`]
  }

  const modifiedSizes = {
    large: {
      x: 24,
      xx: 28,
    },
  }

  return modifiedSizes[size] && pxToRem(modifiedSizes[size][sizeModifier])
}

const getIconColor = (variables, colors) => {
  return _.get(colors, 'foreground', variables.color || 'currentColor')
}

const iconStyles: ComponentSlotStylesInput<IconProps, IconVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = v.colorScheme[p.color]

    return {
      display: 'inline-block', // we overriding this for Base theme

      // overriding base theme border handling
      ...((p.bordered || v.borderColor) &&
        getBorderedStyles(v.borderColor || getIconColor(v, colors))),
    }
  },

  svgRoot: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      backgroundColor: v.backgroundColor,
    }
  },

  outlinePart: ({ props: p }): ICSSInJSStyle => {
    return {
      display: 'none',

      ...(p.outline && {
        display: 'block',
      }),
    }
  },

  filledPart: ({ props: p }): ICSSInJSStyle => {
    return {
      ...(p.outline && {
        display: 'none',
      }),
    }
  },

  svg: ({ props: { size, color, disabled, rotate }, variables: v }): ICSSInJSStyle => {
    const colors = v.colorScheme[color]
    const iconSizeInRems = getIconSize(size, v.sizeModifier, v)

    return {
      display: 'block',
      width: iconSizeInRems,
      height: iconSizeInRems,
      fill: getIconColor(v, colors),

      ...(disabled && {
        fill: v.disabledColor,
      }),

      transform: `rotate(${rotate}deg)`,

      ...getSvgStyle('svg'),
    }
  },

  svgFlippingInRtl: config => {
    const { props, rtl } = config
    return {
      ...callable(iconStyles.svg)(config),
      ...(rtl && {
        transform: `scaleX(-1) rotate(${-1 * props.rotate}deg)`,
      }),
    }
  },

  g: getSvgStyle('g'),

  path: getSvgStyle('path'),

  secondaryPath: getSvgStyle('secondaryPath'),
}

export default iconStyles
