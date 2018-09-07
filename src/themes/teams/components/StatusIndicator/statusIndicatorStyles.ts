import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IStatusIndicatorPropsWithDefaults } from '../../../../components/StatusIndicator/StatusIndicator'
import { IStatusIndicatorVariables } from './statusIndicatorVariables'

const getRootElementSize = (size: number) => {
  if (size < 4) {
    return 8
  }
  if (size < 6) {
    return 10
  }
  return 12
}

const getRootElementDimension = (size: number, borderWidth: number) => {
  return getRootElementSize(size) + borderWidth * 2
}

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
    props: { size, status },
    variables,
  }: {
    props: IStatusIndicatorPropsWithDefaults
    variables: IStatusIndicatorVariables
  }): ICSSInJSStyle => ({
    display: 'table',
    height: pxToRem(getRootElementDimension(size, variables.borderWidth)),
    width: pxToRem(getRootElementDimension(size, variables.borderWidth)),
    borderRadius: '9999px',
    backgroundColor: status && getBackgroundColor(status, variables),
    borderColor: variables.borderColor,
    borderWidth: pxToRem(variables.borderWidth),
    borderStyle: 'solid',
  }),
  statusIcon: ({
    props: { status },
    variables,
  }: {
    props: IStatusIndicatorPropsWithDefaults
    variables: IStatusIndicatorVariables
  }): ICSSInJSStyle => {
    return {
      display: 'table-cell',
      color: status && getTextColor(status, variables),
      height: '100%',
      width: '100%',
    }
  },
}

export default statusIndicatorStyles
