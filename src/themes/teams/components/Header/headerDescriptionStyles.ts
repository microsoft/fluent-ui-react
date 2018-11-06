import { teamsPxToRem } from '../../utils'
import { ICSSInJSStyle } from '../../../types'

export default {
  root: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
    fontSize: teamsPxToRem(22),
    color: v.color,
    fontWeight: 400,
  }),
}
