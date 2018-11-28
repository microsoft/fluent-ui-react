import * as React from 'react'
import * as _ from 'lodash'
import { mount } from 'enzyme'
import { domEvent, nextFrame, withProvider } from 'test/utils'

import Portal, { PortalProps } from 'src/components/Portal/Portal'
import PortalInner from 'src/components/Portal/PortalInner'

describe('Portal', () => {
  const mountPortal = (props: PortalProps = {}, options?) => {
    const TestPortal = props => withProvider(<Portal content={<p />} {...props} />)

    const wrapperWrapper = mount(<TestPortal {...props} />, options)
    const wrapper = wrapperWrapper.find(Portal)

    return {
      wrapper: wrapperWrapper,
      portal: wrapper,
    }
  }

  const testPortalInnerIsOpen = (rootWrapper, visible: boolean) => {
    expect(rootWrapper.find(PortalInner).length).toBe(visible ? 1 : 0)
  }

  const testPortalOpenState = (rootWrapper, content: React.ReactNode, isOpen: boolean) => {
    const portalIsOpen = isOpen

    testPortalInnerIsOpen(rootWrapper, portalIsOpen)
    expect(rootWrapper.contains(content)).toBe(portalIsOpen)
  }

  it('translates open prop to state', () => {
    const content = <p />
    const { wrapper } = mountPortal({ content })
    testPortalOpenState(wrapper, content, false)

    const { wrapper: openPortalWrapper } = mountPortal({ content, open: true })
    testPortalOpenState(openPortalWrapper, content, true)
  })

  describe('click', () => {
    it('opens the portal on trigger click when true', () => {
      const { wrapper } = mountPortal({ trigger: <button> button </button> })
      testPortalInnerIsOpen(wrapper, false)

      wrapper.find('button').simulate('click')
      testPortalInnerIsOpen(wrapper, true)
    })

    it('closes the portal on click when set', () => {
      const { wrapper } = mountPortal({ trigger: <button />, defaultOpen: true })
      testPortalInnerIsOpen(wrapper, true)

      wrapper.find('button').simulate('click')
      testPortalInnerIsOpen(wrapper, false)
    })
  })

  describe('document click', () => {
    it('closes the portal', async () => {
      const { wrapper } = mountPortal({ defaultOpen: true })
      testPortalInnerIsOpen(wrapper, true)

      await nextFrame()

      domEvent.click(document)
      wrapper.update()
      testPortalInnerIsOpen(wrapper, false)
    })

    it('does not close on click inside', () => {
      const { wrapper } = mountPortal({
        content: <p id="inner" />,
        defaultOpen: true,
      })

      testPortalInnerIsOpen(wrapper, true)

      domEvent.click('#inner')
      wrapper.update()
      testPortalInnerIsOpen(wrapper, true)
    })
  })

  describe('onMount', () => {
    it('called when portal opens', () => {
      const props = { open: true, onMount: jest.fn() }
      const { wrapper } = mountPortal(props)
      wrapper.setProps({ open: true })

      expect(props.onMount).toHaveBeenCalledTimes(1)
    })
  })

  describe('onUnmount', () => {
    it('is called when portal closes', () => {
      const onUnmount = jest.fn()
      const { wrapper } = mountPortal({ open: true, onUnmount })
      wrapper.setProps({ open: false })

      expect(onUnmount).toHaveBeenCalledTimes(1)
    })

    it('is called only once when portal closes and then is unmounted', () => {
      const onUnmount = jest.fn()
      const { wrapper } = mountPortal({ open: true, onUnmount })
      wrapper.setProps({ open: false })
      wrapper.unmount()

      expect(onUnmount).toHaveBeenCalledTimes(1)
    })

    it('is called only once when directly unmounting', () => {
      const onUnmount = jest.fn()
      const { wrapper } = mountPortal({ open: true, onUnmount })
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

      const { wrapper } = mountPortal(
        { trigger: <button id="trigger" />, triggerRef },
        { attachTo: mountNode },
      )
      wrapper.detach()
      document.body.removeChild(mountNode)
    })
  })

  describe('trigger', () => {
    it('renders null when not set', () => {
      const { portal } = mountPortal()

      expect(portal.html()).toEqual(null)
    })

    it('renders the trigger when set', () => {
      const text = 'open by click on me'
      const trigger = <button>{text}</button>
      const { wrapper } = mountPortal({ trigger })

      expect(wrapper.find('button').length).toBe(1)
      expect(wrapper.text()).toEqual(text)
    })
  })
})
