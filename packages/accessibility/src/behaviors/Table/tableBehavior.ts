import { Accessibility } from '../../types'

const tableBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'table',
    },
  },
})

export default tableBehavior
