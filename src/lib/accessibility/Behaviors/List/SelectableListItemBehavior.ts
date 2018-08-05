import { Accessibility } from '../../interfaces'

export const SelectableListItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'option',
      'aria-selected': !!props['active'],
    },
  },
})
