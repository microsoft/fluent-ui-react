import * as React from 'react'

import {
  isConformant,
  handlesAccessibility,
  htmlIsAccessibilityCompliant,
  implementsShorthandProp,
  getRenderedAttribute,
} from 'test/specs/commonTests'
import { mountWithProvider, mountWithProviderAndGetComponent } from 'test/utils'
import { toggleButtonBehavior } from '@fluentui/accessibility'

import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'

const buttonImplementsShorthandProp = implementsShorthandProp(Button)

describe('Button', () => {
  isConformant(Button)
  buttonImplementsShorthandProp('icon', Icon, {
    mapsValueToProp: 'name',
    requiredShorthandProps: { name: 'at' },
  })

  describe('accessibility', () => {
    describe('button', () => {
      handlesAccessibility(Button, {
        defaultRootRole: undefined,
      })
    })

    describe('div Button', () => {
      handlesAccessibility(Button, {
        requiredProps: { as: 'div' },
        defaultRootRole: 'button',
      })
    })

    describe('aria-disabled', () => {
      test('is set to true, if disabled attribute is provided', () => {
        const renderedComponent = mountWithProviderAndGetComponent(Button, <Button disabled />)
        expect(getRenderedAttribute(renderedComponent, 'aria-disabled', '')).toBe('true')
      })

      test('is set to undefined, if disabled attribute is not provided', () => {
        const renderedComponent = mountWithProviderAndGetComponent(Button, <Button />)
        expect(getRenderedAttribute(renderedComponent, 'aria-disabled', '')).toBe(undefined)
      })
    })

    describe('HTML accessibility rules validation', () => {
      describe('icon button must have textual representation for screen readers', () => {
        test('with title', async () =>
          await htmlIsAccessibilityCompliant(<Button icon="books" title="testing button" />))

        test('with aria-label attribute', async () =>
          await htmlIsAccessibilityCompliant(<Button icon="books" aria-label="testing button" />))

        test('with aria-labelledby attribute', async () =>
          await htmlIsAccessibilityCompliant(
            <div>
              <Button icon="books" aria-labelledby="tstBtn" />
              <span id="tstBtn" aria-label="testing button" />
            </div>,
          ))
      })

      describe('different buttons variants', () => {
        test('button', async () =>
          await htmlIsAccessibilityCompliant(<Button>Simple test button</Button>))

        test('button with text and icon', async () =>
          await htmlIsAccessibilityCompliant(<Button icon="test" content="Simple test button" />))
      })
    })

    describe('ToggleButton behavior', () => {
      describe('role button', () => {
        test('is not defined, if compoenent is button', () => {
          const renderedComponent = mountWithProviderAndGetComponent(
            Button,
            <Button accessibility={toggleButtonBehavior} />,
          )
          expect(getRenderedAttribute(renderedComponent, 'role', '')).toBe(undefined)
        })

        test('is defined, if compoenent is not button', () => {
          const renderedComponent = mountWithProviderAndGetComponent(
            Button,
            <Button as="div" accessibility={toggleButtonBehavior} />,
          )
          expect(getRenderedAttribute(renderedComponent, 'role', '')).toBe('button')
        })
      })

      describe('aria-pressed', () => {
        test('is set to true, if active attribute is provided', () => {
          const renderedComponent = mountWithProviderAndGetComponent(
            Button,
            // @ts-ignore
            <Button active="true" accessibility={toggleButtonBehavior} />,
          )
          expect(getRenderedAttribute(renderedComponent, 'aria-pressed', '')).toBe('true')
        })

        test('is set to false, if active attribute is not provided', () => {
          const renderedComponent = mountWithProviderAndGetComponent(
            Button,
            <Button accessibility={toggleButtonBehavior} />,
          )
          expect(getRenderedAttribute(renderedComponent, 'aria-pressed', '')).toBe('false')
        })
      })

      describe('aria-disabled', () => {
        test('is set to true, if disabled attribute is provided', () => {
          const renderedComponent = mountWithProviderAndGetComponent(
            Button,
            <Button disabled accessibility={toggleButtonBehavior} />,
          )
          expect(getRenderedAttribute(renderedComponent, 'aria-disabled', '')).toBe('true')
        })

        test('is set to undefined, if disabled attribute is not provided', () => {
          const renderedComponent = mountWithProviderAndGetComponent(
            Button,
            <Button accessibility={toggleButtonBehavior} />,
          )
          expect(getRenderedAttribute(renderedComponent, 'aria-disabled', '')).toBe(undefined)
        })
      })
    })
  })

  describe('circular', () => {
    const circularProp = 'circular'

    test('is not set by default', () => {
      const btnCircular = mountWithProviderAndGetComponent(Button, <Button />).prop(circularProp)
      expect(btnCircular).toBeUndefined()
    })

    test('can be set to true', () => {
      const btnCircular = mountWithProviderAndGetComponent(Button, <Button circular />).prop(
        circularProp,
      )

      expect(btnCircular).toEqual(true)
    })
  })

  describe('onClick', () => {
    test('does not call onClick when the button is disabled', () => {
      const onClick = jest.fn()
      const button = mountWithProvider(<Button disabled onClick={onClick} />).find('Button')
      button.simulate('click')

      expect(onClick).not.toHaveBeenCalled()
    })

    test('is called with (e, props) on a click', () => {
      const onClick = jest.fn()
      const button = mountWithProviderAndGetComponent(Button, <Button onClick={onClick} />)

      button.simulate('click')

      expect(onClick).toHaveBeenCalledTimes(1)
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ onClick }),
      )
    })
  })
})
