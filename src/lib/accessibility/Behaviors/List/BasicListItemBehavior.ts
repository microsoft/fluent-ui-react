import { IAccessibilityDefinition } from '../../interfaces'

/**
 * @description
 * Adds role='listitem'.
 * The 'listitem' role is used to identify an element that is a single item in a list.
 */

const BasicListItemBehavior: (props: any) => IAccessibilityDefinition = (props: any) => ({
  attributes: {
    root: {
      role: 'listitem',
      tabIndex: props.idx === 0 ? '0' : '-1',
    },
  },
})

export default BasicListItemBehavior
