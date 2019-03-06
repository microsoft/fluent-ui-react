import { FocusZoneUtilities } from '@stardust-ui/react'

export const focusNearest = (buttonNode: HTMLButtonElement, order: 'next' | 'previous') => {
  const getter =
    order === 'next' ? FocusZoneUtilities.getNextElement : FocusZoneUtilities.getPreviousElement
  const element = getter(document.body, buttonNode)

  FocusZoneUtilities.focusAsync(element)
}
