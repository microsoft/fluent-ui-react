import * as React from 'react'
import _ from 'lodash'
import { mount } from 'enzyme'
import { PopperProps } from 'react-popper'
import { Placement } from 'popper.js'

import Provider from 'src/components/Provider'
import Popup, { IPopupProps, Position } from 'src/components/Popup/Popup'
import Portal from 'src/components/Portal'

describe('Popup', () => {
  let wrapper: any

  const mountPopup = (props: IPopupProps = {}, rtl?: boolean) =>
    (wrapper = mount(<Popup content={<p />} {...props} />))

  const testPopupPosition = ({
    position,
    expectedPlacement,
    rtl = false,
  }: {
    position: Position
    expectedPlacement: Placement
    rtl?: boolean
  }) =>
    it(`Popup ${position} position sends ${expectedPlacement} to Popper props`, () => {
      const props: IPopupProps = {
        content: <p />,
        position,
        trigger: <button />,
      }
      wrapper = mount(
        <Provider theme={{ rtl }}>
          <Popup {...props} />
        </Provider>,
      )
      wrapper.setState({ triggerRef: document.createElement('a') })
      const PopperElem = wrapper.find('Portal').prop('children')

      expect(PopperElem.props.placement).toEqual(expectedPlacement)
    })

  describe('renderComponent', () => {
    it('renders a Portal', () => {
      mountPopup()

      expect(wrapper.find(Portal).length).toBe(1)
    })

    it('passes correct props to Portal', () => {
      const props: IPopupProps = {
        basic: true,
        className: 'test',
        content: 'content',
        position: 'top-start',
        trigger: <button />,
      }
      mountPopup(props)

      const portalComponent = wrapper.find(Portal)
      const { className, trigger, triggerRef } = portalComponent.props()

      expect(portalComponent.length).toEqual(1)
      expect(className).toEqual(`${Popup.className} ${props.className}`)
      expect(trigger).toEqual(props.trigger)
      expect(triggerRef).toBeInstanceOf(Function)
    })

    it('passes correct props to Popper and PopupContent', () => {
      const popupContent = 'test popup content'
      const triggerRef = document.createElement('a')
      const props: IPopupProps = {
        basic: true,
        className: 'test',
        content: <p>{popupContent}</p>,
        position: 'top-start',
        trigger: <button />,
      }

      mountPopup(props)
      wrapper.setState({ triggerRef })

      const PortalComp = wrapper.find('Portal')
      const PopperElem = PortalComp.prop('children')
      const {
        placement,
        referenceElement,
        children: childrenHandler,
      }: PopperProps = PopperElem.props
      const PopupContent: any = childrenHandler({} as any)
      const { basic, children } = PopupContent.props

      // Popper props tests
      expect(placement).toEqual(props.position)
      expect(referenceElement).toEqual(triggerRef)
      expect(childrenHandler).toBeInstanceOf(Function)

      // PopupContent props tests
      expect(basic).toEqual(props.basic)
      expect(children.type).toEqual('p')
      expect(children.props.children).toEqual(popupContent)
    })

    describe('handles Popup position correctly in ltr', () => {
      testPopupPosition({ position: 'top-start', expectedPlacement: 'top-start' })
      testPopupPosition({ position: 'top', expectedPlacement: 'top' })
      testPopupPosition({ position: 'top-end', expectedPlacement: 'top-end' })
      testPopupPosition({ position: 'bottom-start', expectedPlacement: 'bottom-start' })
      testPopupPosition({ position: 'bottom', expectedPlacement: 'bottom' })
      testPopupPosition({ position: 'bottom-end', expectedPlacement: 'bottom-end' })
      testPopupPosition({ position: 'before-start', expectedPlacement: 'left-start' })
      testPopupPosition({ position: 'before', expectedPlacement: 'left' })
      testPopupPosition({ position: 'before-end', expectedPlacement: 'left-end' })
      testPopupPosition({ position: 'after-start', expectedPlacement: 'right-start' })
      testPopupPosition({ position: 'after', expectedPlacement: 'right' })
      testPopupPosition({ position: 'after-end', expectedPlacement: 'right-end' })
    })

    describe('handles Popup position correctly in rtl', () => {
      const rtl = true
      testPopupPosition({ position: 'top-start', expectedPlacement: 'top-end', rtl })
      testPopupPosition({ position: 'top', expectedPlacement: 'top', rtl })
      testPopupPosition({ position: 'top-end', expectedPlacement: 'top-start', rtl })
      testPopupPosition({ position: 'bottom-start', expectedPlacement: 'bottom-end', rtl })
      testPopupPosition({ position: 'bottom', expectedPlacement: 'bottom', rtl })
      testPopupPosition({ position: 'bottom-end', expectedPlacement: 'bottom-start', rtl })
      testPopupPosition({ position: 'before-start', expectedPlacement: 'right-start', rtl })
      testPopupPosition({ position: 'before', expectedPlacement: 'right', rtl })
      testPopupPosition({ position: 'before-end', expectedPlacement: 'right-end', rtl })
      testPopupPosition({ position: 'after-start', expectedPlacement: 'left-start', rtl })
      testPopupPosition({ position: 'after', expectedPlacement: 'left', rtl })
      testPopupPosition({ position: 'after-end', expectedPlacement: 'left-end', rtl })
    })
  })
})
