import { Accessibility } from '../../types'
import alertWarningBehavior from './alertWarningBehavior'
import defaultBehavior from '../defaultBehavior'

/**
 * @description
 * Uses 'alertWarningBehavior` for 'danger' and 'warning' variants.
 * Uses 'defaultBehavior` for 'success' and 'info' variants.
 */
const alertBehavior: Accessibility = (props: any) =>
  props.warning || props.danger ? alertWarningBehavior(props) : defaultBehavior(props)

export default alertBehavior
