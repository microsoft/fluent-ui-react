import * as React from 'react'

import { ICSSInJSStyle } from '../types'

type CSSBorderStyles = Pick<React.CSSProperties, 'borderWidth' | 'borderRadius'>

type FocusBorderStyles = CSSBorderStyles & {
  borderColorInner?: string
  borderColorOuter?: string
  focusFromKeyboard?: boolean
}

type BorderPseudoElementStyles = CSSBorderStyles & { borderEdgeValue: string }

const defaultColor = 'transparent'

const getPseudoElementStyles = (args: BorderPseudoElementStyles): ICSSInJSStyle => {
  const { borderEdgeValue, ...styles } = args

  return {
    content: '""',
    position: 'absolute',
    borderStyle: 'solid',
    top: borderEdgeValue,
    right: borderEdgeValue,
    bottom: borderEdgeValue,
    left: borderEdgeValue,
    ...styles,
  }
}

export const getBorderStyles = (args: FocusBorderStyles): ICSSInJSStyle => {
  const {
    borderWidth,
    borderRadius,
    borderColorOuter = defaultColor,
    borderColorInner = defaultColor,
    focusFromKeyboard,
  } = args

  const defaultBorderStyles: React.CSSProperties = { borderWidth, borderRadius }

  return {
    ...defaultBorderStyles,

    ...(focusFromKeyboard && {
      ':focus': {
        borderColor: 'transparent',

        ':before': getPseudoElementStyles({
          borderEdgeValue: '0',
          borderColor: borderColorInner,
          ...defaultBorderStyles,
        }),

        ':after': getPseudoElementStyles({
          borderEdgeValue: `-${borderWidth}`,
          borderColor: borderColorOuter,
          ...defaultBorderStyles,
        }),
      },
    }),
  }
}
