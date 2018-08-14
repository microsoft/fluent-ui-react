import { IAccessibilityDefinition } from '../../interfaces'

const BasicListItemBehavior: IAccessibilityDefinition = {
  attributes: {
    root: {
      role: 'listitem',
      'data-is-focusable': true,
    },
  },
}

export default BasicListItemBehavior
