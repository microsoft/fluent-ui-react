import { Accessibility } from '../../interfaces'

const DividerBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.content ? undefined : 'separator',
    },
  },
})

export default DividerBehavior
