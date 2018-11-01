import { debugRoot } from '../../../../styles/debugStyles'

const itemLayoutStyles = {
  root: ({ props, variables }) => {
    const { debugLayout } = props
    return {
      ...(debugLayout && debugRoot()),
      paddingLeft: variables.paddingLeft,
      paddingRight: variables.paddingRight,
    }
  },

  header: () => ({
    // ...
  }),

  headerMedia: () => ({
    // ...
  }),

  content: () => ({
    // ...
  }),

  contentMedia: () => ({
    // ...
  }),

  end: () => ({
    // ...
  }),

  endMedia: () => ({
    // ...
  }),
}

export default itemLayoutStyles
