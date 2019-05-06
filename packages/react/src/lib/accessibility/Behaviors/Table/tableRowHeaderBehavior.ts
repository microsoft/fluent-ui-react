import { Accessibility } from '../../types'
const tableRowHeaderBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.as !== 'th' ? 'rowheader' : undefined,
      scope: 'row',
    },
  },
})

export default tableRowHeaderBehavior
