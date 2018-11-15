import { ICSSInJSStyle } from '../../../types'

const treeTitleStyles = {
  root: ({ variables }): ICSSInJSStyle => ({
    padding: '.1rem 0',
    cursor: 'pointer',
    color: variables.defaultColor,
  }),
}

export default treeTitleStyles
