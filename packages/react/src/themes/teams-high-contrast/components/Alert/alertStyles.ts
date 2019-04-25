import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { AlertProps } from '../../../../components/Alert/Alert'
import { AlertHighContrastVariables } from './alertVariables'
import getBorderFocusStyles from 'src/themes/teams/getBorderFocusStyles'

const alertStyles: ComponentSlotStylesInput<AlertProps, AlertHighContrastVariables> = {
  action: ({ variables: v, props: p, theme: { siteVariables } }): ICSSInJSStyle => ({
    ...(p.isFromKeyboard && {
      ':focus': {
        backgroundColor: v.focusBackgroundColor,

        ':hover': {
          backgroundColor: v.hoverBackgroundColor,
        },
      },
    }),

    ':hover': {
      backgroundColor: v.hoverBackgroundColor,

      // TODO: consider creating dedicated method for border styles on hover
      ...getBorderFocusStyles({ siteVariables, isFromKeyboard: true })[':focus'],
    },
  }),
}

export default alertStyles
