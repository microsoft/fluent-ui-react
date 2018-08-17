import * as React from 'react'

import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import { getTestingRenderedComponent, mountWithProvider } from 'test/utils'

import Button from 'src/components/Button/Button'
import { MenuBehavior } from 'src/lib/accessibility'

describe('Button', () => {
  isConformant(Button)

  describe('Button accessibility', () => {
    handlesAccessibility(Button, {
      defaultRootRole: undefined,
      accessibilityOverride: MenuBehavior,
      overridenRootRole: 'menu',
    })
  })

  describe('Div Button accessibility', () => {
    handlesAccessibility(Button, {
      requiredProps: { as: 'div' },
      defaultRootRole: 'button',
      accessibilityOverride: MenuBehavior,
      overridenRootRole: 'menu',
    })
  })

  describe('type', () => {
    const typeProp = 'type'

    it('is not set by default', () => {
      const btnType = getTestingRenderedComponent(Button, <Button />).prop(typeProp)
      expect(btnType).toBeUndefined()
    })

    it('can be set to primary', () => {
      const type = 'primary'
      const btnType = getTestingRenderedComponent(Button, <Button type={type} />).prop(typeProp)

      expect(btnType).toEqual(type)
    })

    it('can be set to secondary', () => {
      const type = 'secondary'
      const btnType = getTestingRenderedComponent(Button, <Button type={type} />).prop(typeProp)

      expect(btnType).toEqual(type)
    })
  })

  describe('circular', () => {
    const circularProp = 'circular'

    it('is not set by default', () => {
      const btnCircular = getTestingRenderedComponent(Button, <Button />).prop(circularProp)
      expect(btnCircular).toBeUndefined()
    })

    it('can be set to true', () => {
      const btnCircular = getTestingRenderedComponent(Button, <Button circular />).prop(
        circularProp,
      )

      expect(btnCircular).toEqual(true)
    })
  })

  describe('onClick', () => {
    it('does not call onClick when the button is disabled', () => {
      const onClick = jest.fn()
      const button = mountWithProvider(<Button disabled onClick={onClick} />).find('Button')
      button.simulate('click')

      expect(onClick).not.toHaveBeenCalled()
    })
  })
})
