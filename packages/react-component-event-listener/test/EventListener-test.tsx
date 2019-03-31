import { documentRef, EventListener } from '@stardust-ui/react-component-event-listener'
import { mount } from 'enzyme'
import * as React from 'react'
import * as simulant from 'simulant'

describe('EventListener', () => {
  it('handles events on `target`', () => {
    const onClick = jest.fn()
    const onKeyDown = jest.fn()

    mount(
      <>
        <EventListener listener={onClick} targetRef={documentRef} type="click" />
        <EventListener listener={onKeyDown} targetRef={documentRef} type="keydown" />
      </>,
    )

    simulant.fire(document, 'click')
    simulant.fire(document, 'keydown')

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }))

    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({ type: 'keydown' }))
  })

  it('unsubscribes correctly', () => {
    const onClick = jest.fn()

    const wrapper = mount(<EventListener listener={onClick} targetRef={documentRef} type="click" />)
    wrapper.unmount()

    simulant.fire(document, 'click')
    expect(onClick).not.toHaveBeenCalled()
  })

  describe('capture', () => {
    it('passes "false" by default', () => {
      const addEventListener = jest.spyOn(document, 'addEventListener')
      const removeEventListener = jest.spyOn(document, 'removeEventListener')

      const wrapper = mount(
        <EventListener listener={() => {}} targetRef={documentRef} type="click" />,
      )
      wrapper.unmount()

      expect(addEventListener).toHaveBeenCalledWith('click', expect.any(Function), false)
      expect(removeEventListener).toHaveBeenCalledWith('click', expect.any(Function), false)
    })

    it('passes `capture` prop when it is defined', () => {
      const addEventListener = jest.spyOn(document, 'addEventListener')
      const removeEventListener = jest.spyOn(document, 'removeEventListener')

      const wrapper = mount(
        <EventListener capture listener={() => {}} targetRef={documentRef} type="click" />,
      )
      wrapper.unmount()

      expect(addEventListener).toHaveBeenCalledWith('click', expect.any(Function), true)
      expect(removeEventListener).toHaveBeenCalledWith('click', expect.any(Function), true)
    })
  })
})
