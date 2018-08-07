import { IAccessibilityDefinition } from '../../interfaces'

const BasicListBehavior: IAccessibilityDefinition = {
  attributes: {
    root: {
      role: 'list',
    },
  },
}

export default BasicListBehavior
