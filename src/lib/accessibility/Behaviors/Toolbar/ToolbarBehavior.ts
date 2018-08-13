import { Accessibility } from '../../interfaces'

const ToolbarBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'toolbar',
      'aria-label': props['aria-label'],
      'aria-disabled': !!props['disabled'],
    },
  },
})

export default ToolbarBehavior
