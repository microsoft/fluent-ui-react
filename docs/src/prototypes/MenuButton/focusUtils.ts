import { focusZoneUtilities, Menu } from '@stardust-ui/react'

export const focusMenuItem = (menuRef: HTMLUListElement, order: 'first' | 'last') => {
  const selector = `.${Menu.Item.slotClassNames.wrapper}:${order}-child .${Menu.Item.className}`
  const element = menuRef.querySelector<HTMLUListElement>(selector)

  element.focus()
}

export const focusNearest = (buttonNode: HTMLButtonElement, order: 'next' | 'previous') => {
  const getter =
    order === 'next' ? focusZoneUtilities.getNextElement : focusZoneUtilities.getPreviousElement
  const element = getter(document.body, buttonNode)

  focusZoneUtilities.focusAsync(element)
}
