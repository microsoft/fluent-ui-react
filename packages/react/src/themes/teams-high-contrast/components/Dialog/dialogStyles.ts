import { pxToRem } from '../../../../lib'
import { ICSSInJSStyle } from '../../../types'

export default {
  root: ({ variables: v }): ICSSInJSStyle => ({
    border: `${pxToRem(1)} solid ${v.foregroundColor}`,
  }),
}
