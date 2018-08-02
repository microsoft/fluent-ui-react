import { getNextElement, focusAsync } from '@uifabric/utilities'

/**
 * Attempts to focus the first focusable element that is a child or child's child of the rootElement.
 *
 * @public
 * @param rootElement - Element to start the search for a focusable child.
 * @returns True if focus was set, false if it was not.
 */
export function focusLastChild(rootElement: HTMLElement): boolean {
  const element: HTMLElement | null = getNextElement(
    rootElement,
    rootElement.lastElementChild as HTMLElement,
    true,
    false,
    false,
    true,
  )

  if (element) {
    focusAsync(element)
    return true
  }
  return false
}
