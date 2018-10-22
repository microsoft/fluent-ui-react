import { pxToRem } from '../../../../lib'
import { ICSSInJSStyle } from '../../../types'

export default {
  root: (): ICSSInJSStyle => {
    return {
      padding: '1em',
      boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)',
      border: '1px solid rgba(34,36,38,.15)',
      borderRadius: pxToRem(5),
    }
  },
}
