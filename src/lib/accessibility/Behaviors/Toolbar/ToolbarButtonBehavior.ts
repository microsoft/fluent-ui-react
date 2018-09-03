import { Accessibility } from '../../interfaces'

const ToolbarButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'button',
      tabIndex: '0',
      'aria-disabled': 'aria-disabled' in props ? props['aria-disabled'] : props['disabled'],
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
    },
  },
  handledProps: ['aria-label', 'aria-labelledby', 'aria-disabled'],
})

export default ToolbarButtonBehavior
