import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { StatusPropsWithDefaults } from '../../../../components/Status/Status'
import { StatusVariables } from './statusVariables'

const getBackgroundColor = (state: string, variables: StatusVariables) => {
  switch (state) {
    case 'success':
      return variables.successBackgroundColor
    case 'info':
      return variables.infoBackgroundColor
    case 'warning':
      return variables.warningBackgroundColor
    case 'error':
      return variables.errorBackgroundColor
    case 'unknown':
    default:
      return variables.defaultBackgroundColor
  }
}

const getTextColor = (state: string, variables: StatusVariables) => {
  switch (state) {
    case 'success':
      return variables.successTextColor
    case 'info':
      return variables.infoTextColor
    case 'warning':
      return variables.warningTextColor
    case 'error':
      return variables.errorTextColor
    case 'unknown':
    default:
      return variables.defaultTextColor
  }
}

const statusStyles: ComponentSlotStylesInput<StatusPropsWithDefaults, StatusVariables> = {
  root: ({ props: { color, size, state }, variables }): ICSSInJSStyle => {
    const sizeInRem = pxToRem(size + 2 * ((variables.borderColor && variables.borderWidth) || 0))
    return {
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: sizeInRem,
      width: sizeInRem,
      verticalAlign: 'middle',
      borderRadius: '9999px',
      ...(variables.borderColor && {
        borderColor: variables.borderColor,
        borderWidth: pxToRem(variables.borderWidth),
        borderStyle: 'solid',
      }),
      backgroundColor: color || getBackgroundColor(state, variables),
    }
  },

  icon: ({ props: { state }, variables }): ICSSInJSStyle => ({
    color: getTextColor(state, variables),
  }),
}

export default statusStyles
