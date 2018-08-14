export const getNextElement = function (
  rootElement: HTMLElement,
  currentElement?: HTMLElement | null,
  checkNodeFunction?: (rootElement: HTMLElement, currentElement?: HTMLElement) => boolean,
  checkNode?: boolean,
  suppressParentTraversal?: boolean,
  suppressChildTraversal?: boolean,
): HTMLElement | null {
  if (!currentElement || (currentElement === rootElement && suppressChildTraversal)) {
    return null
  }

  if (checkNode && checkNodeFunction && checkNodeFunction(rootElement, currentElement)) {
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
  checkNodeFunction?: (rootElement: HTMLElement, currentElement?: HTMLElement) => boolean,
  checkNode?: boolean,
  suppressParentTraversal?: boolean,
  suppressChildTraversal?: boolean,
): HTMLElement | null {
  if (!currentElement || (currentElement === rootElement && suppressChildTraversal)) {
    return null
  }

  if (checkNode && checkNodeFunction && checkNodeFunction(rootElement, currentElement)) {
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
