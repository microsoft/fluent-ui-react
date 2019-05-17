/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 * @param {string[]} handledProps A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @returns {{}} A shallow copy of the prop object
 */
const getUnhandledProps = (handledProps: string[] = [], props: { [key: string]: any }) => {
  return Object.keys(props).reduce((acc: { [key: string]: any }, prop: string) => {
    if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop]

    return acc
  }, {})
}

export default getUnhandledProps
