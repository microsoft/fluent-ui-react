import { Accessibility } from '../../interfaces'

const ToolbarBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'toolbar',
      'aria-disabled': props['disabled'],
    },
  },
})

export default ToolbarBehavior
