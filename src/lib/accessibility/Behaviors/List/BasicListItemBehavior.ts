import { IAccessibilityDefinition } from '../../interfaces'

/**
 * @description
 * Adds role='listitem'.
 * The 'listitem' role is used to identify an element that is a single item in a list.
 */

const BasicListItemBehavior: (props: any) => IAccessibilityDefinition = (props: any) => {
  return {
    attributes: {
      root: {
        role: 'listitem',
      },
    },
  }
}

export default BasicListItemBehavior
