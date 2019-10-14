import { Accessibility } from '../../types'

const tableColumnBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      // role: props.as !== 'th' ? 'columnheader' : undefined,
      role: 'columnheader',
      // scope: 'col',
    },
  },
})

export default tableColumnBehavior
