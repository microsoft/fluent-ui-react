import { Accessibility } from '../../types'
import alertWarningBehavior from './alertWarningBehavior'
import alertInfoBehavior from './alertInfoBehavior'

/**
 * @description
 * Uses 'alertWarningBehavior` for 'danger' and 'warning' variants.
 * Uses 'alertInfoBehavior` for 'success' and 'info' variants.
 */

const alertBehavior: Accessibility = (props: any) =>
  props.warning || props.danger ? alertWarningBehavior(props) : alertInfoBehavior(props)

export default alertBehavior
