import { Accessibility } from '../../types'
import alertWarningBehavior, { AlertProps } from './alertWarningBehavior'
import alertBaseBehavior from './alertBaseBehavior'

/**
 * @description
 * Uses `alertWarningBehavior` for 'danger' and 'warning' variants.
 */
const alertBehavior: Accessibility<AlertProps> = props =>
  props.warning || props.danger
    ? {
        attributes: {
          ...alertWarningBehavior(props).attributes,
          ...alertBaseBehavior(props).attributes,
        },
      }
    : alertBaseBehavior(props)

export default alertBehavior
