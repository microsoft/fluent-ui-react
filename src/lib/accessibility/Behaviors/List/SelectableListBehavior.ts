import { IAccessibilityDef } from '../../interfaces'

const SelectableListBehavior: IAccessibilityDef = {
  attributes: {
    root: {
      role: 'listbox',
    },
  },
}

export default SelectableListBehavior
