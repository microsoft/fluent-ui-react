import { Accessibility } from '../../interfaces'

/**
 * @description
 * Adds role='listbox'.
 * The listbox role is used to identify an element that creates a list from which a user may select one or more items.
 */

const selectableListBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'listbox',
    },
  },
})

export default selectableListBehavior
