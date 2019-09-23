import { find, isOverridden } from 'src/components/Debug/utils'

describe('debugUtils', () => {
  describe('find', () => {
    test('returns true if key matches search', () => {
      const search = 'color'
      const key = 'color'
      const obj = { [key]: 'red' }

      expect(find(obj, key, search)).toEqual(true)
    })

    test('returns true if value matches search', () => {
      const search = 'red'
      const key = 'color'
      const obj = { [key]: 'red' }

      expect(find(obj, key, search)).toEqual(true)
    })

    test('returns false if value does not match search', () => {
      const search = 'red'
      const key = 'color'
      const obj = { [key]: 'blue' }

      expect(find(obj, key, search)).toEqual(false)
    })

    test('returns true if key includes search', () => {
      const search = 'color'
      const key = 'backgroundColor'
      const obj = { [key]: 'red' }

      expect(find(obj, key, search)).toEqual(true)
    })

    test('returns true if value includes search', () => {
      const search = 'red'
      const key = 'backgroundColor'
      const obj = { [key]: 'darkred' }

      expect(find(obj, key, search)).toEqual(true)
    })
  })

  describe('isOverridden', () => {
    test('returns true if there is override', () => {
      const key = 'color'
      const data = {
        [key]: 'red',
      }

      const overrides = {
        [key]: 'blue',
      }

      expect(isOverridden(data, key, overrides)).toEqual(true)
    })

    test('returns false if is not override', () => {
      const key = 'color'
      const data = {
        [key]: 'red',
      }

      const overrides = {
        backgroundColor: 'blue',
      }

      expect(isOverridden(data, key, overrides)).toEqual(false)
    })

    test('gracefully handles null and undefine', () => {
      const key = 'color'
      const data = {
        [key]: 'red',
      }

      let overrides = null
      expect(isOverridden(data, key, overrides)).toEqual(false)
      expect(() => isOverridden(data, key, overrides)).not.toThrow()

      overrides = undefined
      expect(isOverridden(data, key, overrides)).toEqual(false)
      expect(() => isOverridden(data, key, overrides)).not.toThrow()

      overrides = {
        [key]: null,
      }
      expect(isOverridden(data, key, overrides)).toEqual(false)
      expect(() => isOverridden(data, key, overrides)).not.toThrow()

      overrides = {
        [key]: undefined,
      }
      expect(isOverridden(data, key, overrides)).toEqual(false)
      expect(() => isOverridden(data, key, overrides)).not.toThrow()
    })
  })
})
