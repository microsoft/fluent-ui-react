import { IAccessibilityDefinition } from '../../interfaces'

const BasicListItemBehavior: IAccessibilityDefinition = {
  attributes: {
    root: {
      role: 'listitem',
    },
  },
}

export default BasicListItemBehavior
