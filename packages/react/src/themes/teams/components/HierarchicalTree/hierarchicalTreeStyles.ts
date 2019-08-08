import { ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../lib'

const hierarchicalTreeStyles = {
  root: (): ICSSInJSStyle => ({
    display: 'block',
    paddingLeft: `${pxToRem(10)}`,
  }),
}

export default hierarchicalTreeStyles
