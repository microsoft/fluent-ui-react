import { ICSSInJSStyle } from '../../../types'

export default {
  root: ({ variables: v }): ICSSInJSStyle => ({
    border: `1px solid ${v.foregroundColor}`,
  }),
}
