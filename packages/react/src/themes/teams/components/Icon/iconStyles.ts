import * as _ from 'lodash'

import { callable, pxToRem, SizeValue } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { IconProps } from '../../../../components/Icon/Icon'
import { getStyle as getSvgStyle } from './svg'
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

const getPaddedStyle = (): ICSSInJSStyle => ({
  padding: pxToRem(4),
})

const getBorderedStyles = (boxShadowColor: string): ICSSInJSStyle => {
  return {
    ...getPaddedStyle(),

    boxShadow: `0 0 0 .05rem ${boxShadowColor} inset`,
  }
}

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

const getIconColor = (variables, colors) => {
  return _.get(colors, 'foreground', variables.color || 'currentColor')
}

const iconStyles: ComponentSlotStylesInput<IconProps, IconVariables> = {
  root: ({
    props: { disabled, name, size, bordered, circular, color, xSpacing, rotate },
    variables: v,
  }): ICSSInJSStyle => {
    const colors = v.colorScheme[color]

    return {
      '[data-icon-type="svg"]': {
        backgroundColor: v.backgroundColor,
        boxSizing: 'border-box',

        // overriding base theme border handling
        ...((bordered || v.borderColor) &&
          getBorderedStyles(v.borderColor || getIconColor(v, colors))),
      },
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
    const iconSizeInRems = pxToRem(getIconSize(size, v.sizeModifier))

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
    const { props, theme } = config
    return {
      ...callable(iconStyles.svg)(config),
      ...(theme.rtl && {
        transform: `scaleX(-1) rotate(${-1 * props.rotate}deg)`,
      }),
    }
  },

  g: getSvgStyle('g'),

  path: getSvgStyle('path'),

  secondaryPath: getSvgStyle('secondaryPath'),
}

export default iconStyles
