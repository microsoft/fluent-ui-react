import { IAccessibilityDefinition } from '../../interfaces'

const SelectableListItemBehavior: (props: any) => IAccessibilityDefinition = (props: any) => ({
  attributes: {
    root: {
      role: 'option',
      'aria-selected': !!props['active'],
    },
  },
})

export default SelectableListItemBehavior
