import * as React from 'react'

const nullRefObject: React.RefObject<null> = { current: null }

// A map of created ref objects to provide memoization.
const refObjects = new WeakMap<Node | Window, React.RefObject<Node | Window>>()

/** Creates a React ref object from existing DOM node. */
const toRefObject = <T extends Node | Window>(node: T): React.RefObject<T> => {
  // A "null" is not valid key for a WeakMap
  if (node === null) {
    return nullRefObject as any
  }

  if (refObjects.has(node)) {
    return refObjects.get(node) as React.RefObject<T>
  }

  const refObject: React.RefObject<T> = { current: node }
  refObjects.set(node, refObject)

  return refObject
}

export default toRefObject
