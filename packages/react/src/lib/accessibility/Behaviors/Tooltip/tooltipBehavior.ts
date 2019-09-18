import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'

/**
 * @description
 * Implements ARIA Tooltip design pattern.
 *
 * @specification
 * Adds attribute 'role=tooltip' to 'tooltip' slot.
 * Adds attribute 'aria-hidden=false' to 'tooltip' slot if 'open' property is true. Sets the attribute to 'true' otherwise.
 * Adds attribute 'aria-describedby' based on the property 'aria-describedby' to 'trigger' slot.
 * Triggers 'close' action with 'Escape' on 'trigger'.
 */
const tooltipBehavior: Accessibility<TooltipBehaviorProps> = props => {
  const defaultAriaDescribedBy = getDefaultAriaDescribedBy(props)

  return {
    attributes: {
      trigger: {
        'aria-describedby': defaultAriaDescribedBy || props['aria-describedby'],
      },
      tooltip: {
        role: 'tooltip',
        id: defaultAriaDescribedBy,
        'aria-hidden': !props.open,
      },
    },
    keyActions: {
      trigger: {
        close: {
          keyCombinations: [{ keyCode: keyboardKey.Escape }],
        },
      },
    },
  }
}

export default tooltipBehavior

/**
 * Returns the element id of the tooltip, it is used when user does not provide aria-describedby as props.
 */
const getDefaultAriaDescribedBy = (props: TooltipBehaviorProps) => {
  if (props['aria-describedby']) {
    return undefined
  }
  return props.contentId
}

export type TooltipBehaviorProps = {
  /** If tooltip is visible. */
  open: boolean
  /** Tooltip's container id. */
  contentId: string
}
