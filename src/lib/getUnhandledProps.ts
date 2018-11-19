import { forwardRefSymbol } from './forwardRefFactory/forwardRefFactories'
import { Props } from '../../types/utils'

/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 * @param Component A function or ReactClass.
 * @param props A ReactElement props object
 */
const getUnhandledProps = (Component: { handledProps: string[] }, props: Props) => {
  const { handledProps = [] } = Component

  return Object.keys(props).reduce(
    (acc, prop) => {
      // Heads up!
      // This condition is a part of the idea about `forwardRefFactory()`, while the factory adds
      // a ref prop in this function we assigning it back to unhandled props.
      if (prop === forwardRefSymbol) {
        acc.ref = props[forwardRefSymbol]

        return acc
      }

      if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop]

      return acc
    },
    {} as Props,
  )
}

export default getUnhandledProps
