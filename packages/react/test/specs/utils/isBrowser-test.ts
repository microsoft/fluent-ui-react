import { isBrowser } from '@fluentui/react'

describe('isBrowser', () => {
  describe('browser', () => {
    test('should return true in a browser', () => {
      expect(isBrowser()).toBe(true)
    })
  })
})
