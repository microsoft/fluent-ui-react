import { Accessibility } from '../../types'
const tableRowBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.as !== 'tr' ? 'row' : undefined,
    },
  },
})

export default tableRowBehavior
