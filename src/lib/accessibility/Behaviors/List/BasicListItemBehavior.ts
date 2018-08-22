import { IAccessibilityDefinition } from '../../interfaces'

/**
 * @description
 * The BasicListItemBehavior adds role='listitem'.
 * The 'listitem' role is used to identify an element that a single item in a list.
 */

const BasicListItemBehavior: IAccessibilityDefinition = {
  attributes: {
    root: {
      role: 'listitem',
    },
  },
}

export default BasicListItemBehavior
