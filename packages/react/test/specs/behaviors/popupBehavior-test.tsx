import { popupBehavior } from 'src/lib/accessibility'
import Button from 'src/components/Button/Button'
import * as React from 'react'

describe('PopupBehavior.ts', () => {
  test('adds tabIndex=0 to trigger if element is not tabbable and tabIndex attribute is not provided', () => {
    const expectedResult = popupBehavior({ trigger: <div /> })
    expect(expectedResult.attributes.trigger.tabIndex).toEqual(0)
  })

  test('adds tabIndex attribute with value passed as prop', () => {
    const expectedResult = popupBehavior({ trigger: <div tabIndex={-1} /> })
    expect(expectedResult.attributes.trigger.tabIndex).toEqual(-1)
  })

  test('does not add tabIndex if element is already tabbable', () => {
    const expectedResult = popupBehavior({ trigger: <Button /> })
    expect(expectedResult.attributes.trigger.tabIndex).toBeUndefined()
  })
})
