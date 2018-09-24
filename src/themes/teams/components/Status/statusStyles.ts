import { pxToRem } from '../../../../lib'
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

const statusStyles: IComponentPartStylesInput<IStatusPropsWithDefaults, any> = {
  root: ({ props: { color, size, state }, variables }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToRem(size + 2 * ((variables.borderColor && variables.borderWidth) || 0)),
    width: pxToRem(size + 2 * ((variables.borderColor && variables.borderWidth) || 0)),
    verticalAlign: 'middle',
    borderRadius: '9999px',
    ...(variables.borderColor && {
      borderColor: variables.borderColor,
      borderWidth: pxToRem(variables.borderWidth),
      borderStyle: 'solid',
    }),
    backgroundColor: color || getBackgroundColor(state, variables),
  }),

  icon: ({ props: { state }, variables }): ICSSInJSStyle => ({
    color: getTextColor(state, variables),
  }),
}

export default statusStyles
