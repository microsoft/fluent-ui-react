import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { AlertProps } from '../../../../components/Alert/Alert'
import { AlertHighContrastVariables } from './alertVariables'
import { pxToRem } from '../../../../lib'

const alertStyles: ComponentSlotStylesInput<AlertProps, AlertHighContrastVariables> = {
  action: ({ variables: v, props: p }): ICSSInJSStyle => ({
    ...(p.isFromKeyboard && {
      ':focus': {
        backgroundColor: v.focusBackgroundColor,
      },
    }),

    ':hover': {
      backgroundColor: v.hoverBackgroundColor,

      ':before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        border: `${pxToRem(2)} solid ${v.hoverBorderColor}`,
        borderRadius: pxToRem(2),
      },
    },
  }),
}

export default alertStyles
