import { pxToRem } from '../../../../lib'
import { ICSSInJSStyle } from '../../../../../types/theme'

export default {
  root: (): ICSSInJSStyle => ({
    display: 'block',
    fontSize: pxToRem(22),
    color: 'rgba(0,0,0,.6)',
    fontWeight: 400,
  }),
}
