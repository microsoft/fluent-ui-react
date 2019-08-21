import { Accessibility } from '../../types'
import alertWarningBehavior from './alertWarningBehavior'
import AlertBehaviorProps from './alertBehaviorProps'

/**
 * @description
 * Uses `alertWarningBehavior` for 'danger' and 'warning' variants.
 */
const alertBehavior: Accessibility<AlertBehaviorProps> = props =>
  props.warning || props.danger ? alertWarningBehavior(props) : {}

export default alertBehavior
