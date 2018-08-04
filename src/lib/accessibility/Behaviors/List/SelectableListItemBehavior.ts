import { Accessibility } from '../../interfaces'

export const SelectableListItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    wrap: {
      role: 'option',
      'aria-selected': !!props['active'],
    },
  },
})
