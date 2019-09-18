import { toRefObject } from '@stardust-ui/react-component-ref'

describe('toRefObject', () => {
  it('creates an ref object from an input', () => {
    const node = document.createElement('div')
    expect(toRefObject(node)).toHaveProperty('current', node)
  })

  it('handles "null" as input', () => {
    expect(toRefObject(null as any)).toHaveProperty('current', null)
  })

  it('returned object is memoized', () => {
    const node = document.createElement('div')
    const refObject = toRefObject(node)

    expect(toRefObject(node)).toBe(refObject)
  })
})
