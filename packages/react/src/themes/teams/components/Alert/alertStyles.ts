import * as React from 'react'
import { ComponentSlotStylesInput, ICSSInJSStyle, SiteVariablesPrepared } from '../../../types'
import { AlertProps } from '../../../../components/Alert/Alert'
import { AlertVariables } from './alertVariables'
import getBorderFocusStyles from '../../getBorderFocusStyles'
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles'

const getIntentColorsFromProps = (
  p: AlertProps,
  v: AlertVariables,
  siteVars: SiteVariablesPrepared,
): React.CSSProperties => {
  const { colors } = siteVars

  if (p.danger) {
    return {
      color: v.dangerColor,
      backgroundColor: v.dangerBackgroundColor,
      borderColor: v.dangerBorderColor,
    }
  }

  if (p.info) {
    return {
      color: v.infoColor,
      backgroundColor: v.infoBackgroundColor,
      borderColor: v.infoBorderColor,
    }
  }

  if (v.oof) {
    return {
      color: v.oofColor,
      backgroundColor: v.oofBackgroundColor,
      borderColor: v.oofBorderColor,
    }
  }

  if (v.urgent) {
    return {
      color: v.urgentColor,
      backgroundColor: v.urgentBackgroundColor,
      borderColor: v.urgentBorderColor,
    }
  }

  if (p.success) {
    return {
      color: colors.green[600], // $app-green-04
      backgroundColor: colors.grey[50], // $app-white
      borderColor: colors.green[200], // $app-green
    }
  }

  if (p.warning) {
    return {
      color: siteVars.colors.grey[450],
      backgroundColor: colors.grey[50], // $app-white
      borderColor: colors.yellow[400], // $app-yellow
    }
  }

  return {
    color: v.color,
    backgroundColor: v.backgroundColor,
    borderColor: v.borderColor,
  }
}

const alertStyles: ComponentSlotStylesInput<AlertProps, AlertVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    borderStyle: v.borderStyle,
    borderWidth: v.borderWidth,
    borderRadius: v.borderRadius,
    minHeight: v.minHeight,
    padding: v.padding,
    fontWeight: v.fontWeight,

    ...getIntentColorsFromProps(p, v, siteVariables),

    ...((p.attached === 'top' || p.attached === true) && {
      borderRadius: `${v.borderRadius} ${v.borderRadius} 0 0`,
    }),

    ...(p.attached === 'bottom' && {
      borderRadius: `0 0 ${v.borderRadius} ${v.borderRadius}`,
    }),
  }),

  content: (): ICSSInJSStyle => ({
    flexGrow: 1,
  }),

  action: ({ variables: v, props: p, theme: { siteVariables } }): ICSSInJSStyle => {
    const iconFilledStyles = getIconFillOrOutlineStyles({ outline: false })

    return {
      height: v.actionSize,
      minWidth: v.actionSize,
      color: v.actionColor || 'currentColor',
      border: 0,
      borderRadius: v.borderRadius,
      ...getIconFillOrOutlineStyles({ outline: true }),

      ':hover': {
        color: 'currentColor',
        ...iconFilledStyles,
      },

      ':focus': {
        ...(p.isFromKeyboard && iconFilledStyles),
        ...getBorderFocusStyles({ siteVariables, isFromKeyboard: p.isFromKeyboard })[':focus'],
      },
    }
  },
}

export default alertStyles
