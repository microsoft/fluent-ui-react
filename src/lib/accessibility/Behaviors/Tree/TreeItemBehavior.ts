import { Accessibility } from '../../interfaces'

const TreeItemBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'treeitem',
      'aria-expanded': props['expanded'],
    },
  },
})

export default TreeItemBehavior
