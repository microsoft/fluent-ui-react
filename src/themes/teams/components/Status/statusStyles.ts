import { teamsPxToRem } from '../../utils'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IStatusPropsWithDefaults } from '../../../../components/Status/Status'
import { IStatusVariables } from './statusVariables'

const getBackgroundColor = (state: string, variables: IStatusVariables) => {
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

const getTextColor = (state: string, variables: IStatusVariables) => {
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

const statusStyles: IComponentPartStylesInput<IStatusPropsWithDefaults, IStatusVariables> = {
  root: ({ props: { color, size, state }, variables }): ICSSInJSStyle => {
    const sizeInRem = teamsPxToRem(
      size + 2 * ((variables.borderColor && variables.borderWidth) || 0),
    )
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: sizeInRem,
      width: sizeInRem,
      verticalAlign: 'middle',
      borderRadius: '9999px',
      ...(variables.borderColor && {
        borderColor: variables.borderColor,
        borderWidth: teamsPxToRem(variables.borderWidth),
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
