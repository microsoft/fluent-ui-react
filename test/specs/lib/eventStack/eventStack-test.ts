import { eventStack } from 'src/lib'
import { domEvent, nextFrame } from 'test/utils'

describe('eventStack', () => {
  afterEach(() => {
    eventStack._targets = new Map()
  })

  describe('sub', () => {
    test('subscribes for single target', async () => {
      const handler = jest.fn()

      eventStack.sub('click', handler)
      await nextFrame()

      domEvent.click(document)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    test('subscribes for custom target', async () => {
      const handler = jest.fn()
      const target = document.createElement('div')

      eventStack.sub('click', handler, { target })
      await nextFrame()

      domEvent.click(target)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    test('subscribes for multiple targets', async () => {
      const documentHandler = jest.fn()
      const windowHandler = jest.fn()

      eventStack.sub('click', documentHandler)
      eventStack.sub('scroll', windowHandler, { target: window })
      await nextFrame()

      domEvent.click(document)
      domEvent.scroll(window)

      expect(documentHandler).toHaveBeenCalledTimes(1)
      expect(windowHandler).toHaveBeenCalledTimes(1)
    })
  })

  describe('unsub', () => {
    test('unsubscribes and destroys eventTarget if it is empty', async () => {
      const handler = jest.fn()

      eventStack.sub('click', handler)
      await nextFrame()

      domEvent.click(document)

      eventStack.unsub('click', handler)
      domEvent.click(document)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    test('unsubscribes but leaves eventTarget if it contains handlers', async () => {
      const clickHandler = jest.fn()
      const keyHandler = jest.fn()

      eventStack.sub('click', clickHandler)
      eventStack.sub('keyDown', keyHandler)
      await nextFrame()

      domEvent.click(document)

      eventStack.unsub('click', clickHandler)
      domEvent.click(document)

      expect(clickHandler).toHaveBeenCalledTimes(1)
      expect(keyHandler).not.toHaveBeenCalled()
    })

    test('unsubscribes from same event multiple times', async () => {
      const handler = jest.fn()

      eventStack.sub('click', handler)
      await nextFrame()

      domEvent.click(document)

      eventStack.unsub('click', handler)
      eventStack.unsub('click', handler)
      domEvent.click(document)

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })
})
