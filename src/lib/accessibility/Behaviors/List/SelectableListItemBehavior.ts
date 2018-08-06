import { Accessibility } from '../../interfaces'

const SelectableListItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'option',
      'aria-selected': !!props['active'],
    },
  },
})

export default SelectableListItemBehavior
