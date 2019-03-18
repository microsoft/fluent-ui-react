import * as React from 'react'
import {
  ComponentSlotStylesInput,
  ICSSInJSStyle,
  SiteVariablesPrepared,
  NaturalColors,
} from '../../../types'
import { AlertProps } from '../../../../components/Alert/Alert'
import { AlertVariables } from './alertVariables'

const getIntentColorsFromProps = (
  p: AlertProps,
  v: AlertVariables,
  siteVars: SiteVariablesPrepared,
): React.CSSProperties => {
  const { colors } = siteVars
  const naturalColors: NaturalColors = siteVars.naturalColors

  if (p.danger) {
    return {
      color: siteVars.red,
      backgroundColor: siteVars.red10,
      borderColor: siteVars.red08,
    }
  }

  if (p.info) {
    return {
      color: colors.grey[900],
      backgroundColor: siteVars.gray09,
      borderColor: siteVars.gray08,
    }
  }

  if (p.success) {
    return {
      color: colors.green[900], // $app-green-04
      backgroundColor: colors.grey[50], // $app-white
      borderColor: naturalColors.lightGreen[900], // $app-green
    }
  }

  if (p.warning) {
    return {
      color: siteVars.gray03,
      backgroundColor: colors.grey[50], // $app-white
      borderColor: colors.yellow[900], // $app-yellow
    }
  }

  return {
    color: v.color,
    backgroundColor: v.backgroundColor,
    borderColor: v.borderColor,
  }
}

const alertStyles: ComponentSlotStylesInput<AlertProps, AlertVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    return {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
      boxSizing: 'border-box',
      border: v.border,
      borderRadius: v.borderRadius,
      minHeight: v.minHeight,
      padding: v.padding,
      fontWeight: v.fontWeight,

      ...getIntentColorsFromProps(p, v, siteVariables),

      ...((p.attached === 'top' || p.attached === true) && {
        borderRadius: `${v.borderRadius} ${v.borderRadius} 0 0`,
      }),

      ...(p.attached === 'bottom' && { borderRadius: `0 0 ${v.borderRadius} ${v.borderRadius}` }),
    }
  },

  content: (): ICSSInJSStyle => ({
    flexGrow: 1,
  }),

  icon: (): ICSSInJSStyle => ({
    /** TODO */
  }),
}

export default alertStyles
