import * as React from 'react'
import handleRef from 'src/lib/handleRef'

describe('handleRef', () => {
  it('throws an error when "ref" is string', () => {
    const node = document.createElement('div')

    expect(() => {
      handleRef({ ref: 'ref' }, 'ref', node)
    }).toThrowError()
  })

  it('calls with node when "ref" is function', () => {
    const ref = jest.fn()
    const node = document.createElement('div')

    handleRef({ ref }, 'ref', node)

    expect(ref).toBeCalledWith(node)
  })

  it('assigns to "current" when "ref" is object', () => {
    const ref = React.createRef<HTMLDivElement>()
    const node = document.createElement('div')

    handleRef({ ref }, 'ref', node)

    expect(ref.current).toBe(node)
  })
})
