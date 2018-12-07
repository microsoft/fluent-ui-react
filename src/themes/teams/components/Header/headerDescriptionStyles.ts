import { pxToRem } from '../../utils'
import { ICSSInJSStyle } from '../../../types'

export default {
  root: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
    fontSize: pxToRem(22),
    color: v.color,
    fontWeight: 400,
  }),
}
