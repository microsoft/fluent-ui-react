import { Accessibility } from '../../interfaces'

const TabListBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'tablist',
      'aria-label': props['aria-label'],
    },
  },
})

export default TabListBehavior
