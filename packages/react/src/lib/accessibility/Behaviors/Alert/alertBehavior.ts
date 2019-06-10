import { Accessibility } from '../../types'
import alertWarningBehavior from './alertWarningBehavior'
import defaultBehavior from '../defaultBehavior'

/**
 * @description
 * Uses 'alertWarningBehavior` for 'danger' and 'warning' variants.
 * Uses 'defaultBehavior` for 'success' and 'info' variants.
 */
const alertBehavior: Accessibility<AlertBehaviorProps> = props =>
  props.warning || props.danger ? alertWarningBehavior(props) : defaultBehavior(props)

export default alertBehavior

type AlertBehaviorProps = {
  /** An alert may be formatted to display a danger message. */
  danger?: boolean
  /** An alert may be formatted to display a warning message. */
  warning?: boolean
}
