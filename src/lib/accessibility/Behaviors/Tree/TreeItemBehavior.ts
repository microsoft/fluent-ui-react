import { Accessibility } from '../../interfaces'

export const TreeItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'treeitem',
      'aria-expanded': props['expanded'],
    },
  },
})
