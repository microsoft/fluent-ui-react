import * as React from 'react'
import {
  ComponentSlotStylesInput,
  ICSSInJSStyle,
  SiteVariablesPrepared,
  NaturalColors,
} from '../../../types'
import { AlertProps } from '../../../../components/Alert/Alert'
import { AlertVariables } from './alertVariables'
import { teamsIconClassNames } from '../Icon/svg'
import { pxToRem } from '../../../../lib'

const getIntentColorsFromProps = (
  p: AlertProps,
  v: AlertVariables,
  siteVars: SiteVariablesPrepared,
): React.CSSProperties => {
  const { colors } = siteVars
  const naturalColors: NaturalColors = siteVars.naturalColors

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

  action: ({ variables: v, props: p }): ICSSInJSStyle => ({
    height: v.actionSize,
    minWidth: v.actionSize,
    color: v.actionColor || 'currentColor',
    border: 0,
    borderRadius: v.borderRadius,

    [`& .${teamsIconClassNames.filled}`]: {
      display: 'none',
    },

    [`& .${teamsIconClassNames.outline}`]: {
      display: 'block',
    },

    ':focus': { outline: 0 },

    ':hover': {
      color: 'currentColor',

      [`& .${teamsIconClassNames.filled}`]: {
        display: 'block',
      },

      [`& .${teamsIconClassNames.outline}`]: {
        display: 'none',
      },
    },

    ...(p.isFromKeyboard && {
      ':focus': {
        outline: 0,

        [`& .${teamsIconClassNames.filled}`]: {
          display: 'block',
        },

        [`& .${teamsIconClassNames.outline}`]: {
          display: 'none',
        },

        ':before': {
          content: '""',
          position: 'absolute',
          top: '1px',
          right: '1px',
          bottom: '1px',
          left: '1px',
          border: `1px solid ${v.focusInnerBorderColor}`,
          borderRadius: pxToRem(2),
        },

        ':after': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          border: `1px solid ${v.focusOuterBorderColor}`,
          borderRadius: pxToRem(2),
        },
      },
    }),
  }),
}

export default alertStyles
