import { debugRoot } from '../../../../styles/debugStyles'
import { ICSSInJSStyle } from '../../../../../types/theme'

// ----------------------------------------
// Root
// ----------------------------------------

const listStyles = {
  root: ({ props }): ICSSInJSStyle => {
    const { as, debugLayout } = props
    return {
      ...(debugLayout && debugRoot()),
      ...((as === 'ul' || as === 'ol') && {
        listStyle: 'none',
        display: 'block',
        padding: 0,
        margin: 0,
      }),
    }
  },
}

export default listStyles
