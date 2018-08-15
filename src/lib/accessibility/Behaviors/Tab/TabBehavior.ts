import { Accessibility } from '../../interfaces'

const TabBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'tab',
      'aria-selected': props['active'],
      tabIndex: '0',
    },
  },
})

export default TabBehavior
