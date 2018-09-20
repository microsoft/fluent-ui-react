import { Accessibility } from '../../interfaces'

/**
 * @description
 * Adds role 'presentation' to 'root' component's part.
 * Adds role 'tab' to 'anchor' component's part.
 * Adds attribute 'tabIndex=0' to 'anchor' component's part.
 * Adds attribute 'aria-selected=true' to 'anchor' component's part based on the property 'active'
 * Adds attribute 'aria-label' based on the property 'aria-label' to 'anchor' component's part.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'anchor' component's part.
 * Adds attribute 'aria-controls' based on the property 'aria-controls' to 'anchor' component's part.
 */
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
