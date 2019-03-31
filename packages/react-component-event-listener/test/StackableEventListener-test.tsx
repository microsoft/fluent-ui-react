import { documentRef, StackableEventListener } from '@stardust-ui/react-component-event-listener'
import { mount } from 'enzyme'
import * as React from 'react'
import * as simulant from 'simulant'

describe('EventListener', () => {
  it('handles stackable events on `target`', () => {
    const firstOnClick = jest.fn()
    const firstOnKeyDown = jest.fn()
    const secondOnClick = jest.fn()

    mount(
      <>
        <StackableEventListener listener={firstOnClick} targetRef={documentRef} type="click" />
        <StackableEventListener listener={secondOnClick} targetRef={documentRef} type="click" />

        <StackableEventListener listener={firstOnKeyDown} targetRef={documentRef} type="keydown" />
      </>,
    )

    simulant.fire(document, 'click')
    simulant.fire(document, 'keydown')

    expect(firstOnClick).not.toHaveBeenCalled()

    expect(firstOnKeyDown).toHaveBeenCalledTimes(1)
    expect(firstOnKeyDown).toHaveBeenCalledWith(expect.objectContaining({ type: 'keydown' }))

    expect(secondOnClick).toHaveBeenCalledTimes(1)
    expect(secondOnClick).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }))
  })

  it('unsubscribes correctly', () => {
    const firstOnClick = jest.fn()
    const secondOnClick = jest.fn()

    mount(<StackableEventListener listener={firstOnClick} targetRef={documentRef} type="click" />)
    const wrapperSecond = mount(
      <StackableEventListener listener={secondOnClick} targetRef={documentRef} type="click" />,
    )

    simulant.fire(document, 'click')
    expect(firstOnClick).not.toHaveBeenCalled()
    expect(secondOnClick).toHaveBeenCalledTimes(1)

    jest.resetAllMocks()
    wrapperSecond.unmount()

    simulant.fire(document, 'click')
    expect(firstOnClick).toHaveBeenCalledTimes(1)
    expect(secondOnClick).not.toHaveBeenCalled()
  })
})
