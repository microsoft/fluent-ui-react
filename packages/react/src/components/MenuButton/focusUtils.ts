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
