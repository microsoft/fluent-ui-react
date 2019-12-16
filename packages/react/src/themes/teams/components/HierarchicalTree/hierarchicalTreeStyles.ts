import { ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../utils'

const hierarchicalTreeStyles = {
  root: (): ICSSInJSStyle => ({
    display: 'block',
    paddingLeft: `${pxToRem(10)}`,
  }),
}

export default hierarchicalTreeStyles
