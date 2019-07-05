import { FocusZoneUtilities, Menu } from '@stardust-ui/react'

export const focusMenuItem = (menuRef: HTMLElement, order: 'first' | 'last') => {
  const selector = `.${Menu.Item.slotClassNames.wrapper}:${order}-child .${Menu.Item.className}`
  const element = menuRef.querySelector<HTMLElement>(selector)

  element.focus()
}

export const focusNearest = (buttonNode: HTMLElement, order: 'next' | 'previous') => {
  const getter =
    order === 'next' ? FocusZoneUtilities.getNextElement : FocusZoneUtilities.getPreviousElement
  const element = getter(document.body, buttonNode)

  FocusZoneUtilities.focusAsync(element)
}
