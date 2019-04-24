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
    top: borderEdgeValue,
    right: borderEdgeValue,
    bottom: borderEdgeValue,
    left: borderEdgeValue,
    ...styles,
  }
}

/**
 * Returns style object that can be used for styling components on focus state
 * NOTE: the element where this is used needs to have relative positioning so that the
 * pseudo elements created on focus can be properly positioned
 */
const getBorderFocusStyles = (args: BorderFocusStyles): ICSSInJSStyle => {
  const sv = args.siteVariables || ({} as BorderFocusStyles)
  const {
    borderWidth = sv.borderWidth,
    borderRadius = sv.borderRadius,
    focusInnerBorderColor = sv.focusInnerBorderColor || defaultColor,
    focusOuterBorderColor = sv.focusOuterBorderColor || defaultColor,
    isFromKeyboard,
  } = args

  const defaultBorderStyles: React.CSSProperties = { borderWidth, borderRadius }

  return {
    ...defaultBorderStyles,

    ...(isFromKeyboard && {
      ':focus': {
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
      },
    }),
  }
}

export default getBorderFocusStyles
