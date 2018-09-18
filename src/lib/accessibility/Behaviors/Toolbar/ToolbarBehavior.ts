import { Accessibility } from '../../interfaces'

const ToolbarBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'toolbar',
    },
  },
})

export default ToolbarBehavior
