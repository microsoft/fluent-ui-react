import { ICSSInJSStyle } from '../../../types'

const treeTitleStyles = {
  root: ({ variables, pxToRem }): ICSSInJSStyle => ({
    padding: `${pxToRem(1)} 0`,
    cursor: 'pointer',
    color: variables.defaultColor,
  }),
}

export default treeTitleStyles
