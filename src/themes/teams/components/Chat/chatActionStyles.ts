import { ICSSInJSStyle } from '../../../../../types/theme'
import { pxToRem } from '../../../../lib'

const chatMessageStyles = {
  root: (): ICSSInJSStyle => ({
    marginTop: '1rem',
    marginBottom: '1rem',
  }),

  icon: (): ICSSInJSStyle => ({
    width: pxToRem(42),
  }),

  timestamp: (): ICSSInJSStyle => ({
    marginLeft: pxToRem(10),
  }),
}

export default chatMessageStyles
