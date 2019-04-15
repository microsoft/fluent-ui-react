import { ICSSInJSStyle } from '../../../types'

export default {
  root: ({ variables: v }): ICSSInJSStyle => ({
    background: v.background,
    color: v.color,
    textAlign: 'left',
  }),
}
