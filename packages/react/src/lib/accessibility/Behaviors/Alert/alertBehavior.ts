import { Accessibility } from '../../types'
import alertWarningBehavior from './alertWarningBehavior'

/**
 * @description
 * Uses `alertWarningBehavior` for 'danger' and 'warning' variants.
 */
const alertBehavior: Accessibility<AlertBehaviorProps> = props =>
  props.warning || props.danger ? alertWarningBehavior(props) : {}

export default alertBehavior

type AlertBehaviorProps = {
  /** An alert may be formatted to display a danger message. */
  danger?: boolean
  /** An alert may be formatted to display a warning message. */
  warning?: boolean
}
