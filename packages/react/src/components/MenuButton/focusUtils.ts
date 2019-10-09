import { getFirstFocusable, getLastFocusable, focusAsync } from '@stardust-ui/react-bindings'

export const focusMenuItem = (menuRef: HTMLElement, order: 'first' | 'last') => {
  const element =
    order === 'first'
      ? getFirstFocusable(menuRef, menuRef.firstElementChild as HTMLElement, true)
      : getLastFocusable(menuRef, menuRef.lastElementChild as HTMLElement, true)

  focusAsync(element)
}
