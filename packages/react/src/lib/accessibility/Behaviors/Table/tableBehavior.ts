import { Accessibility } from '../../types'
const tableBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.as !== 'table' ? 'table' : undefined,
    },
  },
})

export default tableBehavior
