import { IAccessibilityFunc } from '../../interfaces'

const SelectableListItemBehavior: IAccessibilityFunc = (props: any) => ({
  attributes: {
    root: {
      role: 'option',
      'aria-selected': !!props['active'],
    },
  },
})

export default SelectableListItemBehavior
