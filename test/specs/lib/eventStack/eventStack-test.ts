import { EventStackSubscription } from 'src/lib'
import { domEvent } from 'test/utils'

describe('eventStack', () => {
  describe('sub', () => {
    test('subscribes for single target', () => {
      const handler = jest.fn()

      const clickSubscription = EventStackSubscription.create('click', handler)
      domEvent.click(document)

      expect(handler).toHaveBeenCalledTimes(1)

      clickSubscription.stop()
    })

    test('subscribes for custom target', () => {
      const handler = jest.fn()
      const target = document.createElement('div')

      const clickSubscription = EventStackSubscription.create('click', handler, { target })
      domEvent.click(target)

      expect(handler).toHaveBeenCalledTimes(1)

      clickSubscription.stop()
    })

    test('subscribes for multiple targets', () => {
      const documentHandler = jest.fn()
      const windowHandler = jest.fn()

      const clickSubscription = EventStackSubscription.create('click', documentHandler)
      const scrollSubscription = EventStackSubscription.create('scroll', windowHandler, {
        target: window,
      })

      domEvent.click(document)
      domEvent.scroll(window)

      expect(documentHandler).toHaveBeenCalledTimes(1)
      expect(windowHandler).toHaveBeenCalledTimes(1)

      clickSubscription.stop()
      scrollSubscription.stop()
    })
  })

  describe('unsub', () => {
    test('unsubscribes and destroys eventTarget if it is empty', () => {
      const handler = jest.fn()

      const clickSubscription = EventStackSubscription.create('click', handler)
      domEvent.click(document)

      clickSubscription.stop()
      domEvent.click(document)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    test('unsubscribes but leaves eventTarget if it contains handlers', () => {
      const clickHandler = jest.fn()
      const keyHandler = jest.fn()

      const clickSubscription = EventStackSubscription.create('click', clickHandler)
      const keyDownSubscription = EventStackSubscription.create('keyDown', keyHandler)

      domEvent.click(document)

      clickSubscription.stop()

      domEvent.click(document)

      expect(clickHandler).toHaveBeenCalledTimes(1)
      expect(keyHandler).not.toHaveBeenCalled()

      keyDownSubscription.stop()
    })

    test('unsubscribes from same event multiple times', () => {
      const handler = jest.fn()

      const clickSubscription = EventStackSubscription.create('click', handler)

      domEvent.click(document)

      clickSubscription.stop()
      clickSubscription.stop()

      domEvent.click(document)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })
})
