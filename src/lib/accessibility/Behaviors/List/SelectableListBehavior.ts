import { IAccessibilityDefinition, FocusZoneMode } from '../../interfaces'
import { FocusZoneDirection } from '../../FocusZone'

/**
 * @description
 * Adds role='listbox'.
 * The listbox role is used to identify an element that creates a list from which a user may select one or more items.
 */

const SelectableListBehavior: IAccessibilityDefinition = {
  attributes: {
    root: {
      role: 'listbox',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      isCircularNavigation: false,
      direction: FocusZoneDirection.vertical,
      preventDefaultWhenHandled: true,
    },
  },
}

export default SelectableListBehavior
