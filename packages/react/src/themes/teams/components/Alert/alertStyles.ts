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
      color: colors.red[900], // $app-red
      backgroundColor: colors.red[50], // $app-red-10
      borderColor: colors.red[100], // $app-red-08
    }
  }

  if (p.info) {
    return {
      color: colors.grey[900], // $app-black
      backgroundColor: colors.grey[300], // $app-gray09
      borderColor: colors.grey[400], // $app-gray08
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
      color: colors.grey[700],
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
      position: 'relative',
      width: '100%',
      boxSizing: 'border-box',
      border: '1px solid',
      borderRadius: v.borderRadius,
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
