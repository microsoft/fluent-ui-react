import { Accessibility, FocusZoneMode } from '../../types'

/**
 * @description
 * The 'list' role is used to identify an element that creates a list.
 *
 * @specification
 * Adds role='list'.
 */

const navigableListBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'list',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      isCircularNavigation: false,
      preventDefaultWhenHandled: true,
      shouldFocusFirstElementWhenReceivedFocus: true,
    },
  },
})

export default navigableListBehavior
