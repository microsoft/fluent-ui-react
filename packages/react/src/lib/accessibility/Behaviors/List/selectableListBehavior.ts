import { Accessibility, FocusZoneMode } from '../../types'
import { ListBehaviorProps } from './listBehavior'
import { FocusZoneDirection } from '../../FocusZone'

/**
 * @description
 * The listbox role is used to identify an element that creates a list from which a user may select one or more items.
 *
 * @specification
 * Adds role='listbox'.
 * Adds attribute 'aria-orientation=horizontal' to 'root' slot if 'horizontal' property is true. Does not set the attribute otherwise.
 * Embeds component into FocusZone.
 * Provides arrow key navigation in bidirectionalDomOrder direction.
 */
const selectableListBehavior: Accessibility<ListBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'listbox',
      tabIndex: props.isItemFocused ? -1 : 0,
      ...(props.horizontal && {
        'aria-orientation': 'horizontal',
      }),
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: FocusZoneDirection.bidirectionalDomOrder,
    },
  },
})

export default selectableListBehavior
