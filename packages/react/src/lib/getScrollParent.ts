import isBrowser from './isBrowser'

const SCROLL_CSS_VALUE_REGEX = /(auto|scroll)/

const isScrollable = (element: Element) => {
  try {
    const { overflow, overflowY, overflowX } = window.getComputedStyle(element)
    return SCROLL_CSS_VALUE_REGEX.test(overflow + overflowX + overflowY)
  } catch (e) {
    return false
  }
}

const getScrollParent = (element: Element) => {
  if (!isBrowser()) return null
  if (!element || element === document.body) return document.body
  if (isScrollable(element)) return element
  return getScrollParent(element.parentNode as Element)
}

export default getScrollParent
