import { Accessibility } from '../../types'
const tableColumnBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.as !== 'th' ? 'columnheader' : undefined,
      scope: 'col',
    },
  },
})

export default tableColumnBehavior
