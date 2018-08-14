export const getNextElement = function (
  rootElement: HTMLElement,
  currentElement?: HTMLElement | null,
  checkNodeFunction?: (currentElement?: HTMLElement) => boolean,
  checkNode?: boolean,
  suppressParentTraversal?: boolean,
  suppressChildTraversal?: boolean,
): HTMLElement | null {
  if (!currentElement || (currentElement === rootElement && suppressChildTraversal)) {
    return null
  }

  if (checkNode && checkNodeFunction && checkNodeFunction(currentElement)) {
    return currentElement
  }

  // Traverse children
  if (!suppressChildTraversal) {
    const childMatch = getNextElement(
      rootElement,
      currentElement.firstElementChild as HTMLElement,
      checkNodeFunction,
      true,
      true,
      false,
    )
    if (childMatch) return childMatch
  }

  if (currentElement === rootElement) {
    return currentElement
  }

  // Traverse siblings
  const siblingMatch = getNextElement(
    rootElement,
    currentElement.nextElementSibling as HTMLElement,
    checkNodeFunction,
    true,
    true,
    false,
  )
  if (siblingMatch) return siblingMatch

  // Traverse parent
  if (!suppressParentTraversal) {
    return getNextElement(
      rootElement,
      currentElement.parentElement as HTMLElement,
      checkNodeFunction,
      true,
      false,
      true,
    )
  }

  return null
}

export const getPreviousElement = function (
  rootElement: HTMLElement,
  currentElement?: HTMLElement | null,
  checkNodeFunction?: (currentElement?: HTMLElement) => boolean,
  checkNode?: boolean,
  suppressParentTraversal?: boolean,
  suppressChildTraversal?: boolean,
): HTMLElement | null {
  if (!currentElement || (currentElement === rootElement && suppressChildTraversal)) {
    return null
  }

  if (checkNode && checkNodeFunction && checkNodeFunction(currentElement)) {
    return currentElement
  }

  // Traverse children
  if (!suppressChildTraversal) {
    const childMatch = getPreviousElement(
      rootElement,
      currentElement.lastElementChild as HTMLElement,
      checkNodeFunction,
      true,
      true,
      false,
    )
    if (childMatch) return childMatch
  }

  // Traverse siblings
  const siblingMatch = getPreviousElement(
    rootElement,
    currentElement.previousElementSibling as HTMLElement,
    checkNodeFunction,
    true,
    true,
    false,
  )
  if (siblingMatch) return siblingMatch

  // Traverse parent
  if (!suppressParentTraversal) {
    return getPreviousElement(
      rootElement,
      currentElement.parentElement as HTMLElement,
      checkNodeFunction,
      true,
      false,
      true,
    )
  }
}

export const isElementVisible = function (element: HTMLElement | undefined | null): boolean {
  if (!element) return false
  return element.offsetHeight !== 0 || element.offsetParent !== null
}

export const isBooleanAttributeSet = function (
  element: HTMLElement | undefined | null,
  attributeName: string,
) {
  if (!element) return false
  return element.hasAttribute(attributeName) && element.getAttribute(attributeName) !== 'false'
}
