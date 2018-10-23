import * as React from 'react'
import _ from 'lodash'
import { mount } from 'enzyme'
import { domEvent, nextFrame } from '../../../utils'

import Portal, { IPortalProps } from 'src/components/Portal/Portal'
import PortalInner from 'src/components/Portal/PortalInner'

describe('Portal', () => {
  let wrapper: any

  const mountPortal = (props: IPortalProps = {}, options?) =>
    (wrapper = mount(<Portal content={<p />} {...props} />, options))

  const testPortalInnerIsOpen = (visible: boolean) => {
    expect(wrapper.find(PortalInner).length).toBe(visible ? 1 : 0)
  }

  const testPortalState = (content: React.ReactNode, state: 'open' | 'closed') => {
    const portalIsOpen = state === 'open'

    testPortalInnerIsOpen(portalIsOpen)
    expect(wrapper.contains(content)).toBe(portalIsOpen)
  }

  describe('open', () => {
    it('opens the portal when toggled from false to true', () => {
      const content = <p />
      mountPortal({ content })
      testPortalState(content, 'closed')

      wrapper.setProps({ open: true })
      testPortalState(content, 'open')
    })

    it('closes the portal when toggled from true to false ', () => {
      const content = <p />
      mountPortal({ content, open: true })
      testPortalState(content, 'open')

      wrapper.setProps({ open: false })
      testPortalState(content, 'closed')
    })
  })

  describe('click', () => {
    it('opens the portal on trigger click when true', () => {
      const spy = jest.fn()
      mountPortal({ trigger: <button onClick={spy}> button </button> })
      testPortalInnerIsOpen(false)

      wrapper.find('button').simulate('click')
      testPortalInnerIsOpen(true)
    })

    it('closes the portal on click when set', () => {
      mountPortal({ trigger: <button />, defaultOpen: true })
      testPortalInnerIsOpen(true)

      wrapper.find('button').simulate('click')
      testPortalInnerIsOpen(false)
    })
  })

  describe('document click', () => {
    it('closes the portal', async () => {
      mountPortal({ defaultOpen: true })
      testPortalInnerIsOpen(true)

      await nextFrame()

      domEvent.click(document)
      wrapper.update()
      testPortalInnerIsOpen(false)
    })

    it('does not close on click inside', () => {
      mountPortal({ content: <p id="inner" />, defaultOpen: true })
      testPortalInnerIsOpen(true)

      domEvent.click('#inner')
      wrapper.update()
      testPortalInnerIsOpen(true)
    })
  })

  describe('onMount', () => {
    it('called when portal opens', () => {
      const props = { open: false, onMount: jest.fn() }
      mountPortal(props)
      wrapper.setProps({ open: true })

      expect(props.onMount).toHaveBeenCalledTimes(1)
    })
  })

  describe('onUnmount', () => {
    it('is called when portal closes', () => {
      const onUnmount = jest.fn()
      mountPortal({ open: true, onUnmount })
      wrapper.setProps({ open: false })

      expect(onUnmount).toHaveBeenCalledTimes(1)
    })

    it('is called only once when portal closes and then is unmounted', () => {
      const onUnmount = jest.fn()
      mountPortal({ open: true, onUnmount })
      wrapper.setProps({ open: false })
      wrapper.unmount()

      expect(onUnmount).toHaveBeenCalledTimes(1)
    })

    it('is called only once when directly unmounting', () => {
      const onUnmount = jest.fn()
      mountPortal({ open: true, onUnmount })
      wrapper.unmount()

      expect(onUnmount).toHaveBeenCalledTimes(1)
    })
  })

  describe('triggerRef', () => {
    it('maintains ref on the trigger', () => {
      const triggerRef = jest.fn()
      const mountNode = document.createElement('div')
      document.body.appendChild(mountNode)

      mountPortal({ trigger: <button id="trigger" />, triggerRef }, { attachTo: mountNode })

      const triggerElem = document.querySelector('#trigger')

      expect(triggerRef).toHaveBeenCalledTimes(1)
      expect(triggerRef).toHaveBeenCalledWith(triggerElem)

      wrapper.detach()
      document.body.removeChild(mountNode)
    })
  })

  describe('trigger', () => {
    it('renders null when not set', () => {
      mountPortal()

      expect(wrapper.html()).toEqual(null)
    })

    it('renders the trigger when set', () => {
      const text = 'open by click on me'
      const trigger = <button>{text}</button>
      mountPortal({ trigger })

      expect(wrapper.find('button').length).toBe(1)
      expect(wrapper.text()).toEqual(text)
    })
  })
})
