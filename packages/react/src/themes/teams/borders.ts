import * as React from 'react'

import { ICSSInJSStyle } from '../types'

interface BorderParams {
  borderWidth: string
  borderRadius: string
  borderColorOuter: string
  borderColorFocusOuter: string
  borderColorInner?: string
  borderColorFocusInner?: string
  focusFromKeyboard?: boolean
}

const commonStyles: React.CSSProperties = {
  content: '""',
  position: 'absolute',
  borderStyle: 'solid',
}

const getPseudoBorderStyles = (args: {
  borderColor: string
  borderEdgeValue: string
}): ICSSInJSStyle => {
  const { borderEdgeValue, borderColor } = args

  return {
    ...commonStyles,
    borderColor,
    top: borderEdgeValue, // TODO former borderWidth
    right: borderEdgeValue,
    bottom: borderEdgeValue,
    left: borderEdgeValue,
  }
}

export const getBorderStyles = (args: BorderParams): ICSSInJSStyle => {
  const defaultColor = 'transparent'

  const {
    borderWidth,
    borderRadius,
    borderColorOuter,
    borderColorFocusOuter,
    borderColorInner = defaultColor,
    borderColorFocusInner = defaultColor,
    focusFromKeyboard,
  } = args

  return {
    // border: 0,
    borderRadius,

    ':before': {
      borderWidth,
      borderRadius, // TODO former borderRadiusFocused,
      ...getPseudoBorderStyles({ borderColor: borderColorInner, borderEdgeValue: borderWidth }),
    },

    ':after': {
      borderWidth,
      borderRadius, // TODO former borderRadiusFocused,
      ...getPseudoBorderStyles({ borderColor: borderColorOuter, borderEdgeValue: '0' }),
    },

    ...(focusFromKeyboard && {
      ':focus': {
        // borderColor: 'transparent', // TODO: needed?
        ':before': {
          borderColor: borderColorFocusInner,
        },

        ':after': {
          borderColor: borderColorFocusOuter,
        },
      },
    }),
  }
}
