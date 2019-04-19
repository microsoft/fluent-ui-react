import { Placement } from 'popper.js'
import * as React from 'react'

import {
  getPopupPlacement,
  applyRtlToOffset,
  Position,
  Alignment,
} from 'src/components/Popup/positioningHelper'
import Popup, { PopupEvents } from 'src/components/Popup/Popup'
import { Accessibility } from 'src/lib/accessibility/types'
import { popupFocusTrapBehavior, popupBehavior, dialogBehavior } from 'src/lib/accessibility/index'

import { domEvent, mountWithProvider } from '../../../utils'
import * as keyboardKey from 'keyboard-key'
import { ReactWrapper } from 'enzyme'

type PositionTestInput = {
  align: Alignment
  position: Position
  expectedPlacement: Placement
  rtl?: boolean
}

describe('Popup', () => {
  const triggerId = 'triggerElement'
  const contentId = 'contentId'
  const testPopupPosition = ({
    align,
    position,
    expectedPlacement,
    rtl = false,
  }: PositionTestInput) =>
    it(`Popup ${position} position is transformed to ${expectedPlacement} Popper's placement`, () => {
      const actualPlacement = getPopupPlacement({ align, position, rtl })
      expect(actualPlacement).toEqual(expectedPlacement)
    })

  const testPopupPositionInRtl = ({
    align,
    position,
    expectedPlacement,
  }: PositionTestInput & { rtl?: never }) =>
    testPopupPosition({ align, position, expectedPlacement, rtl: true })

  const getPopupContent = (popup: ReactWrapper) => {
    return popup.find(`div#${contentId}`)
  }

  type ExpectPopupToOpenAndCloseParams = {
    onProp: PopupEvents
    keyboardKeyToOpen: keyboardKey
    keyboardKeyToClose: keyboardKey
  }

  const expectPopupToOpenAndClose = ({
    onProp,
    keyboardKeyToOpen,
    keyboardKeyToClose,
  }: ExpectPopupToOpenAndCloseParams) => {
    const popup = mountWithProvider(
      <Popup
        trigger={<span id={triggerId}> text to trigger popup </span>}
        content={{ id: contentId }}
        on={onProp}
      />,
    )
    // check popup open on key press
    const popupTriggerElement = popup.find(`#${triggerId}`)
    popupTriggerElement.simulate('keydown', { keyCode: keyboardKeyToOpen })

    expect(getPopupContent(popup).exists()).toBe(true)

    // check popup closes on Esc
    popupTriggerElement.simulate('keydown', { keyCode: keyboardKeyToClose })
    expect(getPopupContent(popup).exists()).toBe(false)
  }

  describe('handles Popup position correctly in ltr', () => {
    testPopupPosition({ position: 'above', align: 'start', expectedPlacement: 'top-start' })
    testPopupPosition({ position: 'above', align: 'center', expectedPlacement: 'top' })
    testPopupPosition({ position: 'above', align: 'end', expectedPlacement: 'top-end' })
    testPopupPosition({ position: 'below', align: 'start', expectedPlacement: 'bottom-start' })
    testPopupPosition({ position: 'below', align: 'center', expectedPlacement: 'bottom' })
    testPopupPosition({ position: 'below', align: 'end', expectedPlacement: 'bottom-end' })
    testPopupPosition({ position: 'before', align: 'top', expectedPlacement: 'left-start' })
    testPopupPosition({ position: 'before', align: 'center', expectedPlacement: 'left' })
    testPopupPosition({ position: 'before', align: 'bottom', expectedPlacement: 'left-end' })
    testPopupPosition({ position: 'after', align: 'top', expectedPlacement: 'right-start' })
    testPopupPosition({ position: 'after', align: 'center', expectedPlacement: 'right' })
    testPopupPosition({ position: 'after', align: 'bottom', expectedPlacement: 'right-end' })
  })

  describe('handles Popup position correctly in rtl', () => {
    testPopupPositionInRtl({ position: 'above', align: 'start', expectedPlacement: 'top-end' })
    testPopupPositionInRtl({ position: 'above', align: 'center', expectedPlacement: 'top' })
    testPopupPositionInRtl({ position: 'above', align: 'end', expectedPlacement: 'top-start' })
    testPopupPositionInRtl({ position: 'below', align: 'start', expectedPlacement: 'bottom-end' })
    testPopupPositionInRtl({ position: 'below', align: 'center', expectedPlacement: 'bottom' })
    testPopupPositionInRtl({ position: 'below', align: 'end', expectedPlacement: 'bottom-start' })
    testPopupPositionInRtl({ position: 'before', align: 'top', expectedPlacement: 'right-start' })
    testPopupPositionInRtl({ position: 'before', align: 'center', expectedPlacement: 'right' })
    testPopupPositionInRtl({ position: 'before', align: 'bottom', expectedPlacement: 'right-end' })
    testPopupPositionInRtl({ position: 'after', align: 'top', expectedPlacement: 'left-start' })
    testPopupPositionInRtl({ position: 'after', align: 'center', expectedPlacement: 'left' })
    testPopupPositionInRtl({ position: 'after', align: 'bottom', expectedPlacement: 'left-end' })
  })

  describe('Popup offset transformed correctly in RTL', () => {
    it("applies transform only for 'above' and 'below' postioning", () => {
      const originalOffsetValue = '100%'

      expect(applyRtlToOffset(originalOffsetValue, 'above')).not.toBe(originalOffsetValue)
      expect(applyRtlToOffset(originalOffsetValue, 'below')).not.toBe(originalOffsetValue)

      expect(applyRtlToOffset(originalOffsetValue, 'before')).toBe(originalOffsetValue)
      expect(applyRtlToOffset(originalOffsetValue, 'after')).toBe(originalOffsetValue)
    })

    const expectOffsetTransformResult = (originalOffset, resultOffset) => {
      expect(applyRtlToOffset(originalOffset, 'above')).toBe(resultOffset)
    }

    it('flips sign of simple expressions', () => {
      expectOffsetTransformResult('100%', '-100%')
      expectOffsetTransformResult('  2000%p ', '-2000%p')
      expectOffsetTransformResult('100  ', '-100')
      expectOffsetTransformResult(' - 200vh', '200vh')
    })

    it('flips sign of complex expressions', () => {
      expectOffsetTransformResult('100% + 200', '-100% - 200')
      expectOffsetTransformResult(' - 2000%p - 400 +800vh ', '2000%p + 400 -800vh')
    })

    it('transforms only horizontal offset value', () => {
      const xOffset = '-100%'
      const yOffset = '800vh'

      const offsetValue = [xOffset, yOffset].join(',')
      const [xOffsetTransformed, yOffsetTransformed] = applyRtlToOffset(offsetValue, 'above').split(
        ',',
      )

      expect(xOffsetTransformed.trim()).not.toBe(xOffset)
      expect(yOffsetTransformed.trim()).toBe(yOffset)
    })
  })

  describe('onOpenChange', () => {
    test('is called on click', () => {
      const spy = jest.fn()

      mountWithProvider(<Popup trigger={<button />} content="Hi" onOpenChange={spy} />)
        .find('button')
        .simulate('click')

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy.mock.calls[0][1]).toMatchObject({ open: true })
    })

    // https://github.com/stardust-ui/react/pull/619
    test('is called on click when controlled', () => {
      const spy = jest.fn()

      mountWithProvider(<Popup open={false} trigger={<button />} content="Hi" onOpenChange={spy} />)
        .find('button')
        .simulate('click')

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy.mock.calls[0][1]).toMatchObject({ open: true })
    })
  })

  describe('open/close popup by keyboard', () => {
    test(`toggle popup with Enter key`, () => {
      expectPopupToOpenAndClose({
        onProp: 'click',
        keyboardKeyToOpen: keyboardKey.Enter,
        keyboardKeyToClose: keyboardKey.Enter,
      })
    })
    test(`toggle popup with Space key`, () => {
      expectPopupToOpenAndClose({
        onProp: 'click',
        keyboardKeyToOpen: keyboardKey.Spacebar,
        keyboardKeyToClose: keyboardKey.Spacebar,
      })
    })
    test(`open popup with Enter key and close it with escape key`, () => {
      expectPopupToOpenAndClose({
        onProp: 'hover',
        keyboardKeyToOpen: keyboardKey.Enter,
        keyboardKeyToClose: keyboardKey.Escape,
      })
    })
    test(`open popup with Space key and close it with escape key`, () => {
      expectPopupToOpenAndClose({
        onProp: 'hover',
        keyboardKeyToOpen: keyboardKey.Spacebar,
        keyboardKeyToClose: keyboardKey.Escape,
      })
    })
    test(`close previous popup with Enter key`, () => {
      const attachTo = document.createElement('div')
      document.body.appendChild(attachTo)

      const triggerId2 = 'triggerElement2'
      const contentId2 = 'contentId2'
      const wrapper = mountWithProvider(
        <React.Fragment>
          <Popup
            trigger={<span id={triggerId}>text to trigger popup</span>}
            content={{ id: contentId }}
            on="click"
          />
          <Popup
            trigger={<span id={triggerId2}>text to trigger popup</span>}
            content={{ id: contentId2 }}
            on="click"
          />
        </React.Fragment>,
        { attachTo },
      )

      expect(wrapper.find(`#${contentId}`).exists()).toBe(false)
      expect(wrapper.find(`#${contentId2}`).exists()).toBe(false)

      domEvent.keyDown(`#${triggerId}`, { keyCode: keyboardKey.Enter })
      wrapper.update() // as event comes outside enzyme, we should trigger update

      expect(wrapper.find(`#${contentId}`).exists()).toBe(true)
      expect(wrapper.find(`#${contentId2}`).exists()).toBe(false)

      domEvent.keyDown(`#${triggerId2}`, { keyCode: keyboardKey.Enter })
      wrapper.update()

      expect(wrapper.find(`#${contentId}`).exists()).toBe(false)
      expect(wrapper.find(`#${contentId2}`).exists()).toBe(true)

      wrapper.unmount()
      document.body.removeChild(attachTo)
    })
  })

  describe('inline', () => {
    test('renders the content in the document body the inline prop is not provided', () => {
      mountWithProvider(<Popup trigger={<button />} content="Content" open={true} />)
      const contentElement = document.body.firstElementChild

      expect(contentElement.classList.contains(Popup.Content.className)).toEqual(true)
    })

    test('renders the content next to the trigger element if the inline prop is provided', () => {
      const wrapper = mountWithProvider(
        <Popup trigger={<button id={triggerId} />} inline content="Content" open={true} />,
      )
      const contentElement = wrapper.getDOMNode().nextSibling as HTMLDivElement

      expect(wrapper.find(Popup.Content).exists()).toEqual(true)
      expect(contentElement.classList.contains(Popup.Content.className)).toEqual(true)
    })
  })

  describe('keyboard event propagation', () => {
    const expectPopupToHandleStopPropagation = (
      behavior: Accessibility,
      shouldStopPropagation: boolean,
    ) => {
      const popup = mountWithProvider(
        <Popup
          trigger={<span id={triggerId}> text to trigger popup </span>}
          content={{ id: contentId }}
          accessibility={behavior}
        />,
      )

      // open popup
      const popupTriggerElement = popup.find(`#${triggerId}`)
      popupTriggerElement.simulate('keydown', { keyCode: keyboardKey.Enter })

      // when popup open, check that stopPropagation is called when keyboard events are invoked
      const stopPropagation = jest.fn()
      const popupContentElement = getPopupContent(popup)
      popupContentElement.simulate('keyDown', { stopPropagation })
      expect(stopPropagation).toHaveBeenCalledTimes(shouldStopPropagation ? 1 : 0)
    }
    test('stops when focus trap behavior is used', () => {
      expectPopupToHandleStopPropagation(popupFocusTrapBehavior, true)
    })
    test('stops when dialog behavior is used', () => {
      expectPopupToHandleStopPropagation(dialogBehavior, true)
    })
    test('does not stop when default behavior is used', () => {
      expectPopupToHandleStopPropagation(popupBehavior, false)
    })
  })
})
