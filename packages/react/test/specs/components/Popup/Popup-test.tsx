import * as React from 'react'

import Popup, { PopupEvents } from 'src/components/Popup/Popup'
import { Accessibility } from 'src/lib/accessibility/types'
import { popupFocusTrapBehavior, popupBehavior, dialogBehavior } from 'src/lib/accessibility/index'

import { domEvent, mountWithProvider } from '../../../utils'
import * as keyboardKey from 'keyboard-key'
import { ReactWrapper } from 'enzyme'

describe('Popup', () => {
  const triggerId = 'triggerElement'
  const contentId = 'contentId'

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
