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
      'aria-controls': props['aria-controls'], // id of the element that will act as a tabpanel.
    },
  },
})

export default TabBehavior
