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
})
