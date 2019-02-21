import { focusZoneUtilities, Menu } from '@stardust-ui/react'
import * as React from 'react'

export const focusMenuItem = (
  menuRef: React.RefObject<HTMLUListElement>,
  order: 'first' | 'last',
) => {
  const selector = `.${Menu.Item.slotClassNames.wrapper}:${order}-child .${Menu.Item.className}`
  const element = menuRef.current.querySelector<HTMLUListElement>(selector)

  element.focus()
}

export const focusButton = (buttonRef: React.RefObject<HTMLButtonElement>) => {
  buttonRef.current.focus()
}

export const focusNearest = (
  buttonRef: React.RefObject<HTMLButtonElement>,
  order: 'next' | 'previous',
) => {
  const getter =
    order === 'next' ? focusZoneUtilities.getNextElement : focusZoneUtilities.getPreviousElement
  const element = getter(document.body, buttonRef.current)

  focusZoneUtilities.focusAsync(element)
}
