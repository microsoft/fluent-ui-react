import { ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../utils'

const treeTitleStyles = {
  root: ({ variables }): ICSSInJSStyle => ({
    padding: `${pxToRem(1)} 0`,
    cursor: 'pointer',
    color: variables.defaultColor,
  }),
}

export default treeTitleStyles
