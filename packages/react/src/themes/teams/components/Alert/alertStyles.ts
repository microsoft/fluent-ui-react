import * as React from 'react'
import { ComponentSlotStylesInput, ICSSInJSStyle, SiteVariablesPrepared } from '../../../types'
import { AlertProps } from '../../../../components/Alert/Alert'
import { AlertVariables } from './alertVariables'

const getIntentColorsFromProps = (
  p: AlertProps,
  v: AlertVariables,
  siteVars: SiteVariablesPrepared,
): React.CSSProperties => {
  const { colors } = siteVars

  // TODO move all these colors in the variables, so that they can be overriden in other teams
  if (p.danger) {
    return {
      color: siteVars.colors.red[400],
      backgroundColor: siteVars.colors.red[50],
      borderColor: siteVars.colors.red[100],
    }
  }

  if (p.info) {
    return {
      color: colors.grey[750],
      backgroundColor: siteVars.colors.grey[150],
      borderColor: siteVars.colors.grey[200],
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
    boxSizing: 'border-box',
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

  action: ({ variables: v }): ICSSInJSStyle => ({
    height: v.actionSize,
    minWidth: v.actionSize,
    margin: `-${v.borderWidth} 0`,
    color: v.actionColor || 'currentColor',
    ':focus': { outline: 0 },
  }),
}

export default alertStyles
