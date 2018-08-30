import { Accessibility } from '../../interfaces'

const ToolbarButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'presentation',
    },
    anchor: {
      role: 'button',
      tabIndex: '0',
      'aria-disabled': props['disabled'],
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
    },
  },
  handledProps: ['aria-label', 'aria-labelledby'],
})

export default ToolbarButtonBehavior
