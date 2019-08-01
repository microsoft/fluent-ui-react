import { FocusZoneUtilities } from '../..'

export const focusMenuItem = (menuRef: HTMLElement, order: 'first' | 'last') => {
  const element =
    order === 'first'
      ? FocusZoneUtilities.getFirstFocusable(
          menuRef,
          menuRef.firstElementChild as HTMLElement,
          true,
        )
      : FocusZoneUtilities.getLastFocusable(menuRef, menuRef.lastElementChild as HTMLElement, true)

  FocusZoneUtilities.focusAsync(element)
}

export const focusNearest = (buttonNode: HTMLElement, order: 'next' | 'previous') => {
  const getter =
    order === 'next' ? FocusZoneUtilities.getNextElement : FocusZoneUtilities.getPreviousElement
  const element = getter(document.body, buttonNode)

  FocusZoneUtilities.focusAsync(element)
}
