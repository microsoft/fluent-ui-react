/**
 * Returns the parent node or the host of the node argument.
 * @argument {Node} node - DOM node.
 * @returns {Node} - parent DOM node.
 */
const getParentNode = (node: Node): Node => {
  if (node.nodeName === 'HTML') {
    return node
  }

  return node.parentNode || (node as any).host
}

/**
 * Returns CSS styles of the given node.
 * @argument {Node} node - DOM node.
 * @returns {Partial<CSSStyleDeclaration>} - CSS styles.
 */
const getStyleComputedProperty = (node: Node): Partial<CSSStyleDeclaration> => {
  if (node.nodeType !== 1) {
    return {}
  }

  const window = node.ownerDocument.defaultView
  return window.getComputedStyle(node as Element, null)
}

/**
 * Returns the first scrollable parent of the given element.
 * @argument {Node} node - DOM node.
 * @returns {Node} - the first scrollable parent.
 */
const getScrollParent = (node: Node): Node => {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!node) return document.body

  switch (node.nodeName) {
    case 'HTML':
    case 'BODY':
      return node.ownerDocument.body
    case '#document':
      return (node as Document).body
  }

  // If any of the overflow props is defined for the node then we return it as the parent
  const { overflow, overflowX, overflowY } = getStyleComputedProperty(node)
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) return node

  return getScrollParent(getParentNode(node))
}

export default getScrollParent
