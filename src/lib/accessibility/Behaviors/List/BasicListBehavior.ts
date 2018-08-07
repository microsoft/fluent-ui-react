import { Accessibility, IAccessibilityDef } from '../../interfaces'

const BasicListBehavior: IAccessibilityDef = {
  attributes: {
    root: {
      role: 'list',
    },
  },
}

export default BasicListBehavior
