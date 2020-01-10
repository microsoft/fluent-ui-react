/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 *
 * @param handledProps - An array with names of props
 * @param props - A ReactElement props object
 * @returns A shallow copy of the prop object
 */
function getUnhandledProps<P extends Record<string, any>>(
  handledProps: (keyof P)[],
  props: P,
  shouldForwardProp: Function = () => false,
): Partial<P> {
  return Object.keys(props).reduce<Partial<P>>((acc, prop) => {
    if (shouldForwardProp(prop)) {
      ;(acc as any)[prop] = props[prop]
      return acc
    }

    if (handledProps.indexOf(prop) !== -1) {
      return acc
    }

    ;(acc as any)[prop] = props[prop]
    return acc
  }, {})
}

export default getUnhandledProps
