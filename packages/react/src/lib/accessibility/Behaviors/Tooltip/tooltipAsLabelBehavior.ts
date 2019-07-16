import { Accessibility } from '../../types'
import tooltipBehavior, { TooltipBehaviorProps } from './tooltipBehavior'

/**
 * @specification
 * Adds attribute 'role=tooltip' to 'tooltip' slot.
 * Adds attribute 'aria-hidden=false' to 'tooltip' slot if 'open' property is true. Sets the attribute to 'true' otherwise.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'trigger' slot.
 * Triggers 'close' action with 'Escape' on 'trigger'.
 */
const tooltipAsLabelBehavior: Accessibility<TooltipBehaviorProps> = props => {
  const behaviorData = tooltipBehavior(props)
  const defaultAriaLabeledBy = getDefaultAriaLabelledBy(props)

  behaviorData.attributes = {
    trigger: {
      'aria-labelledby': defaultAriaLabeledBy || props['aria-labelledby'],
    },
    tooltip: {
      ...behaviorData.attributes.tooltip,
      id: defaultAriaLabeledBy,
    },
  }

  return behaviorData
}

export default tooltipAsLabelBehavior

/**
 * Returns the element id of the tooltip, it is used when user does not provide aria-label or
 * aria-labelledby as props.
 */
const getDefaultAriaLabelledBy = (props: TooltipBehaviorProps) => {
  if (props['aria-label'] || props['aria-labelledby']) {
    return undefined
  }
  return props.contentId
}
