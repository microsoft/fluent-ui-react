import { EventStack } from 'src/lib'
import { domEvent } from 'test/utils'

describe('eventStack', () => {
  describe('sub', () => {
    test('makes subscription to be non-empty', () => {
      const clickSubscription = EventStack.subscribe('click', jest.fn())
      expect(clickSubscription.isEmpty).toBe(false)
    })

    test('subscribes for single target', () => {
      const handler = jest.fn()

      const clickSubscription = EventStack.subscribe('click', handler)
      domEvent.click(document)

      expect(handler).toHaveBeenCalledTimes(1)

      clickSubscription.unsubscribe()
    })

    test('subscribes for custom target', () => {
      const handler = jest.fn()
      const target = document.createElement('div')

      const clickSubscription = EventStack.subscribe('click', handler, { target })
      domEvent.click(target)

      expect(handler).toHaveBeenCalledTimes(1)

      clickSubscription.unsubscribe()
    })

    test('subscribes for multiple targets', () => {
      const documentHandler = jest.fn()
      const windowHandler = jest.fn()

      const clickSubscription = EventStack.subscribe('click', documentHandler)
      const scrollSubscription = EventStack.subscribe('scroll', windowHandler, {
        target: window,
      })

      domEvent.click(document)
      domEvent.scroll(window)

      expect(documentHandler).toHaveBeenCalledTimes(1)
      expect(windowHandler).toHaveBeenCalledTimes(1)

      clickSubscription.unsubscribe()
      scrollSubscription.unsubscribe()
    })
  })

  describe('unsub', () => {
    test('makes subscription to be empty', () => {
      const clickSubscription = EventStack.subscribe('click', jest.fn())
      clickSubscription.unsubscribe()

      expect(clickSubscription.isEmpty).toBe(true)
    })

    test('unsubscribes and destroys eventTarget if it is empty', () => {
      const handler = jest.fn()

      const clickSubscription = EventStack.subscribe('click', handler)
      domEvent.click(document)

      clickSubscription.unsubscribe()
      domEvent.click(document)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    test('unsubscribes but leaves eventTarget if it contains handlers', () => {
      const clickHandler = jest.fn()
      const keyHandler = jest.fn()

      const clickSubscription = EventStack.subscribe('click', clickHandler)
      const keyDownSubscription = EventStack.subscribe('keyDown', keyHandler)

      domEvent.click(document)

      clickSubscription.unsubscribe()

      domEvent.click(document)

      expect(clickHandler).toHaveBeenCalledTimes(1)
      expect(keyHandler).not.toHaveBeenCalled()

      keyDownSubscription.unsubscribe()
    })

    test('unsubscribes from same event multiple times', () => {
      const handler = jest.fn()

      const clickSubscription = EventStack.subscribe('click', handler)

      domEvent.click(document)

      clickSubscription.unsubscribe()
      clickSubscription.unsubscribe()

      domEvent.click(document)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })
})
