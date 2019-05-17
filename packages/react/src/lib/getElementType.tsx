import * as React from 'react'
import { Props } from '../types'

/**
 * Returns a createElement() type based on the props of the Component.
 * Useful for calculating what type a component should render as.
 *
 * @param {object} props A ReactElement props object
 * @returns {string|function} A ReactElement type
 */
function getElementType(props: Props): React.ElementType {
  return props.as || 'div'
}

export default getElementType
