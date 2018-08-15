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
    },
  },
})

export default ToolbarButtonBehavior
