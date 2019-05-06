import { Accessibility } from '../../types'
const tableCellBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.as !== 'td' ? 'cell' : undefined,
    },
  },
})

export default tableCellBehavior
