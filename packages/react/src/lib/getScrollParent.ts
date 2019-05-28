import isBrowser from './isBrowser'

/**
 * Returns the parentNode or the host of the element
 * @argument {Node} node
 * @returns {Node} parent
 */
const getParentNode = (node: Node): Node => {
  if (node.nodeName === 'HTML') {
    return node
  }

  return node.parentNode || (node as any).host
}

/**
 * Get CSS computed property of the given element
 * @argument {Node} node
 * @argument {string} property
 */
const getStyleComputedProperty = (node: Node, property?: string) => {
  if (node.nodeType !== 1) {
    return []
  }

  const window = node.ownerDocument.defaultView
  const css = window.getComputedStyle(node as Element, null)
  return property ? css[property] : css
}

/**
 * Returns the scrolling parent of the given element
 * @argument {Node} node
 * @returns {Node} scroll parent
 */
const getScrollParent = (node: Node): Node => {
  if (!isBrowser()) return null

  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!node) return document.body

  switch (node.nodeName) {
    case 'HTML':
    case 'BODY':
      return node.ownerDocument.body
    case '#document':
      return (node as Document).body
  }

  // Firefox wants us to check `-x` and `-y` variations as well
  const { overflow, overflowX, overflowY } = getStyleComputedProperty(node)
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) return node

  return getScrollParent(getParentNode(node))
}

export default getScrollParent
