import * as React from 'react'

import {
  isConformant,
  handlesAccessibility,
  implementsShorthandProp,
  getRenderedAttribute,
} from 'test/specs/commonTests'
import { getTestingRenderedComponent, mountWithProvider } from 'test/utils'
import { ToggleButtonBehavior } from '../../../../src/lib/accessibility'

import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'

import { MenuBehavior } from 'src/lib/accessibility'

const buttonImplementsShorthandProp = implementsShorthandProp(Button)

describe('Button', () => {
  isConformant(Button)
  buttonImplementsShorthandProp('icon', Icon, { mapsValueToProp: 'name' })

  describe('accessibility', () => {
    describe('button', () => {
      handlesAccessibility(Button, {
        defaultRootRole: undefined,
        accessibilityOverride: MenuBehavior,
        overriddenRootRole: 'menu',
      })
    })

    describe('div Button', () => {
      handlesAccessibility(Button, {
        requiredProps: { as: 'div' },
        defaultRootRole: 'button',
        accessibilityOverride: MenuBehavior,
        overriddenRootRole: 'menu',
      })
    })

    describe('aria disabled', () => {
      it('is set to true, if disabled attribute is provided', () => {
        const renderedComponent = getTestingRenderedComponent(Button, <Button disabled />)
        expect(getRenderedAttribute(renderedComponent, 'aria-disabled', '')).toBe('true')
      })

      it('is set to false, if disabled attribute is not provided', () => {
        const renderedComponent = getTestingRenderedComponent(Button, <Button />)
        expect(getRenderedAttribute(renderedComponent, 'aria-disabled', '')).toBe('false')
      })
    })

    describe('toggleButton behavior', () => {
      describe('role button', () => {
        it('is not defined, if compoenent is button', () => {
          const renderedComponent = getTestingRenderedComponent(
            Button,
            <Button accessibility={ToggleButtonBehavior} />,
          )
          expect(getRenderedAttribute(renderedComponent, 'role', '')).toBe(undefined)
        })

        it('is defined, if compoenent is not button', () => {
          const renderedComponent = getTestingRenderedComponent(
            Button,
            <Button as="div" accessibility={ToggleButtonBehavior} />,
          )
          expect(getRenderedAttribute(renderedComponent, 'role', '')).toBe('button')
        })
      })

      describe('aria-pressed', () => {
        it('is set to true, if active attribute is provided', () => {
          const renderedComponent = getTestingRenderedComponent(
            Button,
            <Button active="true" accessibility={ToggleButtonBehavior} />,
          )
          expect(getRenderedAttribute(renderedComponent, 'aria-pressed', '')).toBe('true')
        })

        it('is set to false, if active attribute is not provided', () => {
          const renderedComponent = getTestingRenderedComponent(
            Button,
            <Button accessibility={ToggleButtonBehavior} />,
          )
          expect(getRenderedAttribute(renderedComponent, 'aria-pressed', '')).toBe('false')
        })
      })

      describe('aria disabled', () => {
        it('is set to true, if disabled attribute is provided', () => {
          const renderedComponent = getTestingRenderedComponent(
            Button,
            <Button disabled accessibility={ToggleButtonBehavior} />,
          )
          expect(getRenderedAttribute(renderedComponent, 'aria-disabled', '')).toBe('true')
        })

        it('is set to false, if disabled attribute is not provided', () => {
          const renderedComponent = getTestingRenderedComponent(
            Button,
            <Button accessibility={ToggleButtonBehavior} />,
          )
          expect(getRenderedAttribute(renderedComponent, 'aria-disabled', '')).toBe('false')
        })
      })
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
