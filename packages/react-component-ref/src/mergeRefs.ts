import * as React from 'react'
import handleRef from './handleRef'

/**
 * Is used to call different React refs all at once, useful if you are using two or more libraries
 * that need a reference of the same React component.
 */
const mergeRefs = (...refs: React.Ref<Node>[]) => (node: Node) => {
  refs.forEach(ref => handleRef(ref, node))
}

export default mergeRefs
