import { ICSSInJSStyle } from '../../../types'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const treeTitleStyles = {
  root: ({ variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    padding: v.padding,
    cursor: 'pointer',
    color: v.color,
    position: 'relative',
    ':focus': {
      outline: 0,
    },
    ':focus-visible': {
      ...getBorderFocusStyles({ siteVariables })[':focus-visible'],
    },
  }),
}

export default treeTitleStyles
