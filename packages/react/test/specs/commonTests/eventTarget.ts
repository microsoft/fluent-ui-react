import { ReactWrapper } from 'enzyme'
import * as _ from 'lodash'

export const EVENT_TARGET_ATTRIBUTE = 'data-simulate-event-here'

export const getEventTargetComponent = (
  wrapper: ReactWrapper,
  listenerName: string,
  eventTargets: object = {},
) => {
  const eventTargetForListener = eventTargets[listenerName]
  let eventTarget

  if (eventTargetForListener) {
    if (_.isObject(eventTargetForListener) && !eventTargetForListener.hostNodes) {
      eventTarget = wrapper.find(eventTargetForListener.element)
    } else {
      eventTarget = wrapper
        .find(eventTargets[listenerName])
        .hostNodes()
        .first()
    }
  } else {
    eventTarget = wrapper
      .find(`[${EVENT_TARGET_ATTRIBUTE}]`)
      .hostNodes()
      .first()
  }

  // if (eventTarget.length === 0) {
  //   throw new Error(
  //     'The event prop was not delegated to the children. You probably ' +
  //     'forgot to use `getUnhandledProps` util to spread the `unhandledProps` props.',
  //   )
  // }

  return eventTarget
}
