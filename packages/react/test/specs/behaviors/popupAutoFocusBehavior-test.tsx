import { popupAutoFocusBehavior } from 'src/lib/accessibility'
import Button from 'src/components/Button/Button'
import * as React from 'react'

describe('PopupAutoFocusBehavior.ts', () => {
  test('adds tabIndex=0 to trigger if element is not tabbable and tabIndex attribute is not provided', () => {
    const expectedResult = popupAutoFocusBehavior({
      trigger: <div />,
      shouldTriggerBeTabbable: true,
    })
    expect(expectedResult.attributes.trigger.tabIndex).toEqual(0)
  })

  test('adds tabIndex attribute with value passed as prop', () => {
    const expectedResult = popupAutoFocusBehavior({
      trigger: <div tabIndex={-1} />,
      shouldTriggerBeTabbable: true,
    })
    expect(expectedResult.attributes.trigger.tabIndex).toEqual(-1)
  })

  test('does not add tabIndex if element is already tabbable', () => {
    const expectedResult = popupAutoFocusBehavior({
      trigger: <Button />,
      shouldTriggerBeTabbable: true,
    })
    expect(expectedResult.attributes.trigger.tabIndex).toBeUndefined()
  })
})
