import { ICSSInJSStyle } from '../../../types'

export default {
  root: ({ props, variables: v }): ICSSInJSStyle => ({
    color: v.color,
    textAlign: props.textAlign,
    display: 'block',
    ...(props.description && { marginBottom: 0 }),
  }),
}
