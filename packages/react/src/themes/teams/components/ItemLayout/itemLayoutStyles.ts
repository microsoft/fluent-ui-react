import { debugRoot } from '../../../../styles/debugStyles'

const itemLayoutStyles = {
  root: ({ props, variables }) => {
    const { debugLayout } = props
    return {
      ...(debugLayout && debugRoot()),
      gridTemplateRows: `minmax(${variables.height}, max-content)`,
      paddingLeft: variables.paddingLeft,
      paddingRight: variables.paddingRight,
    }
  },
}

export default itemLayoutStyles
