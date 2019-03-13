import { FocusZoneUtilities, Menu } from '@stardust-ui/react'

export const focusMenuItem = (menuRef: HTMLUListElement, order: 'first' | 'last') => {
  const selector = `.${Menu.Item.slotClassNames.wrapper}:${order}-child .${Menu.Item.className}`
  const element = menuRef.querySelector<HTMLUListElement>(selector)

  element.focus()
}

export const focusNearest = (buttonNode: HTMLButtonElement, order: 'next' | 'previous') => {
  const getter =
    order === 'next' ? FocusZoneUtilities.getNextElement : FocusZoneUtilities.getPreviousElement
  const element = getter(document.body, buttonNode)

  FocusZoneUtilities.focusAsync(element)
}
