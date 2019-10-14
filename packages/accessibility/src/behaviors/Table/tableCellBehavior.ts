import { Accessibility } from '../../types'

const tableCellBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'cell',
    },
  },
})

export default tableCellBehavior
