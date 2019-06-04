import * as React from 'react'

import { ICSSInJSStyle, SiteVariablesPrepared } from '../types'

type CSSBorderStyles = Pick<React.CSSProperties, 'borderWidth' | 'borderRadius'>

type BorderFocusStyles = CSSBorderStyles & {
  siteVariables?: SiteVariablesPrepared
  focusInnerBorderColor?: string
  focusOuterBorderColor?: string
  isFromKeyboard?: boolean
}

type BorderPseudoElementStyles = CSSBorderStyles & { borderEdgeValue: string }

const defaultColor = 'transparent'

const getPseudoElementStyles = (args: BorderPseudoElementStyles): ICSSInJSStyle => {
  const { borderEdgeValue, ...styles } = args

  return {
    content: '""',
    position: 'absolute',
    borderStyle: 'solid',
    pointerEvents: 'none',
    top: borderEdgeValue,
    right: borderEdgeValue,
    bottom: borderEdgeValue,
    left: borderEdgeValue,
    pointerEvents: 'none',
    ...styles,
  }
}

/**
 * Returns style object that can be used for styling components on focus state.
 * NOTE: the element where this is used needs to have relative positioning so that the
 * pseudo elements created on focus can be properly positioned.
 */
const getBorderFocusStyles = (args: BorderFocusStyles): ICSSInJSStyle => {
  const sv = args.siteVariables
  const {
    borderWidth = sv.borderWidth,
    borderRadius = sv.borderRadius,
    focusInnerBorderColor = sv.focusInnerBorderColor || defaultColor,
    focusOuterBorderColor = sv.focusOuterBorderColor || defaultColor,
    isFromKeyboard,
  } = args

  const defaultBorderStyles: React.CSSProperties = { borderWidth, borderRadius }

  return {
    ':focus': {
      outline: 0,

      ...(isFromKeyboard
        ? {
            borderColor: 'transparent',

            ':before': getPseudoElementStyles({
              borderEdgeValue: '0',
              borderColor: focusInnerBorderColor,
              ...defaultBorderStyles,
            }),

            ':after': getPseudoElementStyles({
              borderEdgeValue: `-${borderWidth}`,
              borderColor: focusOuterBorderColor,
              ...defaultBorderStyles,
            }),
          }
        : {}),
    },
  }
}

export default getBorderFocusStyles
