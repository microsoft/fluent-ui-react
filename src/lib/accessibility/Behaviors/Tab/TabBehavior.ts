import { Accessibility } from '../../interfaces'

const TabBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'tab',
      tabIndex: '0',
      'aria-selected': 'aria-selected' in props ? props['aria-selected'] : props['active'],
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      'aria-controls': props['aria-controls'],
    },
  },
  handledProps: ['aria-label', 'aria-labelledby', 'aria-controls', 'aria-selected'],
})

export default TabBehavior
