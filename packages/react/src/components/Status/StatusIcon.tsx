import { compose } from '@fluentui/react-bindings'

import { createShorthandFactory } from '../../utils'
import Icon, { IconProps } from '../Icon/Icon'

export interface StatusIconProps extends IconProps {
  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown'
}

const StatusIcon = compose(Icon, {
  displayName: 'StatusIcon',
  mapPropsToStyles: props => ({ state: props.state }),
})

// @ts-ignore
StatusIcon.create = createShorthandFactory({
  // @ts-ignore
  Component: StatusIcon,
  mappedProp: 'name',
  allowsJSX: false,
})

export default StatusIcon
