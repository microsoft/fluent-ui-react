import * as React from 'react'

const refObjects = new WeakMap<Node, React.RefObject<Node>>()

const toRefObject = <T extends Node>(node: T): React.RefObject<T> => {
  if (refObjects.has(node)) {
    return refObjects.get(node) as React.RefObject<T>
  }

  const refObject: React.RefObject<T> = { current: node }
  refObjects.set(node, refObject)

  return refObject
}

export default toRefObject
