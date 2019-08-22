import { Accessibility } from '../../types'
import alertWarningBehavior from './alertWarningBehavior'
import AlertProps from './alertProps'

/**
 * @description
 * Uses `alertWarningBehavior` for 'danger' and 'warning' variants.
 */
const alertBehavior: Accessibility<AlertProps> = props =>
  props.warning || props.danger ? alertWarningBehavior(props) : {}

export default alertBehavior
