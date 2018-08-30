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
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-controls': props['aria-controls'],
    },
  },
  handledProps: ['aria-label', 'aria-labelledby', 'aria-controls'],
})

export default TabBehavior
