import { Accessibility } from '../../types'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'
import { PopupEvents, PopupEventsArray } from '../../../../components/Popup/Popup'

/**
 * @description
 * Adds tabIndex='0' to 'trigger' slot, if it is not tabbable element and no tabIndex attribute provided.
 *
 * @specification
 * Adds attribute 'aria-disabled=true' to 'trigger' slot if 'disabled' property is true. Does not set the attribute otherwise.
 * Adds attribute 'role=complementary' to 'popup' slot.
 */
const popupBehavior: Accessibility<PopupBehaviorProps> = props => {
  const onAsArray = _.isArray(props.on) ? props.on : [props.on]
  return {
    attributes: {
      trigger: {
        ...(props.shouldTriggerBeTabbable
          ? { tabIndex: getAriaAttributeFromProps('tabIndex', props, 0) }
          : undefined),
        'aria-disabled': props.disabled,
      },
      popup: {
        role: 'complementary',
      },
    },
    keyActions: {
      popup: {
        closeAndFocusTrigger: {
          keyCombinations: [{ keyCode: keyboardKey.Escape }],
        },
      },
      trigger: {
        close: {
          keyCombinations: [{ keyCode: keyboardKey.Escape }],
        },
        toggle: {
          keyCombinations: _.includes(onAsArray, 'click') && [
            { keyCode: keyboardKey.Enter },
            { keyCode: keyboardKey.Spacebar },
          ],
        },
        open: {
          keyCombinations: _.includes(onAsArray, 'hover') &&
            !_.includes(onAsArray, 'context') && [
              { keyCode: keyboardKey.Enter },
              { keyCode: keyboardKey.Spacebar },
            ],
        },
      },
    },
  }
}

const isFocusable = propsData => {
  try {
    const { as, href, type } = propsData
    return (
      type === 'button' ||
      type === 'input' ||
      (type === 'a' && href !== undefined) ||
      as === 'button'
    )
  } catch {
    return false
  }
}

const getAriaAttributeFromProps = (
  attributeName: string,
  props: any,
  defaultValue: number | string,
) => {
  if (!props.trigger) return undefined
  if (props.trigger.props[attributeName]) {
    return props.trigger.props[attributeName]
  }
  const { as, href } = props.trigger.props
  const { type } = props.trigger
  if (isFocusable({ as, href, type })) {
    return undefined
  }
  return defaultValue
}

export default popupBehavior

export type PopupBehaviorProps = {
  /** Events triggering the popup. */
  on?: PopupEvents | PopupEventsArray
  /** Indicates if popup's trigger is disabled. */
  disabled?: boolean
  /** Element which triggers popup */
  trigger?: {
    props?: {
      /** Element type. */
      as?: string
      href?: string
      tabIndex?: string
    }
    /** Element type. */
    type?: string
  }
  /** Should trigger be made tabbable */
  shouldTriggerBeTabbable: boolean
}
