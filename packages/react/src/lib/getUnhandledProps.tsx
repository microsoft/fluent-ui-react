/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 *
 * @param {string[]} handledProps An array with names of props
 * @param {object} props A ReactElement props object
 * @returns {{}} A shallow copy of the prop object
 */
function getUnhandledProps<P extends Record<string, any>>(handledProps: (keyof P)[], props: P) {
  return Object.keys(props).reduce((acc, prop) => {
    if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop]

    return acc
  }, {})
}

export default getUnhandledProps
