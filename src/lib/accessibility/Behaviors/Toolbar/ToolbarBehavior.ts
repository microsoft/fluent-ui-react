import { Accessibility } from '../../interfaces'

const ToolbarBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'toolbar',
      'aria-label': props['aria-label'],
    },
  },
})

export default ToolbarBehavior
