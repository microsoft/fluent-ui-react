import { IAccessibilityDefinition } from '../../interfaces'

const SelectableListBehavior: IAccessibilityDefinition = {
  attributes: {
    root: {
      role: 'listbox',
    },
  },
}

export default SelectableListBehavior
