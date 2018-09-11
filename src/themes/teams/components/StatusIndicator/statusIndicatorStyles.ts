import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IStatusIndicatorPropsWithDefaults } from '../../../../components/StatusIndicator/StatusIndicator'
import { IStatusIndicatorVariables } from './statusIndicatorVariables'

const getBackgroundColor = (status: string, variables: IStatusIndicatorVariables) => {
  switch (status) {
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

const getTextColor = (status: string, variables: IStatusIndicatorVariables) => {
  switch (status) {
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

const statusIndicatorStyles: IComponentPartStylesInput = {
  root: ({
    props: { color, size, status },
    variables,
  }: {
    props: IStatusIndicatorPropsWithDefaults
    variables: IStatusIndicatorVariables
  }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToRem(size + 2 * (variables.borderWidth || 0)),
    width: pxToRem(size + 2 * (variables.borderWidth || 0)),
    verticalAlign: 'middle',
    borderRadius: '9999px',
    ...(variables.borderColor && {
      borderColor: variables.borderColor,
      borderWidth: pxToRem(variables.borderWidth),
      borderStyle: 'solid',
    }),
    backgroundColor: color || getBackgroundColor(status, variables),
  }),

  icon: ({
    props: { status },
    variables,
  }: {
    props: IStatusIndicatorPropsWithDefaults
    variables: IStatusIndicatorVariables
  }): ICSSInJSStyle => ({
    color: getTextColor(status, variables),
  }),
}

export default statusIndicatorStyles
