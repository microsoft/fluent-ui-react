import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'

import { StatusIconProps } from '../../../../components/Status/StatusIcon'
import { StatusIconVariables } from './statusIconVariables'
import { pxToRem } from '../../../../utils'

const getTextColor = (state: string, variables: StatusIconVariables) => {
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

const statusIconStyles: ComponentSlotStylesPrepared<StatusIconProps, StatusIconVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    color: getTextColor(p.state, v),
    marginLeft: 0,
    marginRight: 0,
  }),
  svg: (): ICSSInJSStyle => ({
    height: pxToRem(7),
    width: pxToRem(7),
  }),
}

export default statusIconStyles
