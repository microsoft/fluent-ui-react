import * as React from 'react'
import { getComponentName, areTypeNamesEqual } from 'src/lib/reactComponentUtils'
import { createMockComponent } from 'test/utils'

describe('getComponentName', () => {
  it('returns null for invalid arguments', () => {
     [undefined, null, '', {}].map(invalidArg =>
      expect(getComponentName(invalidArg as any)).toBeFalsy(),
    )
  })

  it('returns the string component itself', () => {
     ['div', 'span', 'MyComponent'].map(stringArg =>
      expect(getComponentName(stringArg)).toEqual(stringArg),
    )
  })

  it('returns the function name', () => {
    const MyComponent = createMockComponent('MyComponent')

    function fooComponent() {
      return null
    }

    expect(getComponentName(fooComponent)).toEqual('fooComponent')
    expect(getComponentName(MyComponent)).toEqual('MyComponent')
  })
})

describe('areTypeNamesEqual', () => {
  it('returns false for invalid arguments', () => {
    expect(areTypeNamesEqual(null, undefined)).toBeFalsy()
    expect(areTypeNamesEqual(undefined, '')).toBeFalsy()
    expect(areTypeNamesEqual('', '')).toBeFalsy()
  })

  describe('for primitive components', () => {
    it('returns false for different types', () => {
      expect(areTypeNamesEqual(React.createElement('p').type, 'div')).toBeFalsy()
      expect(areTypeNamesEqual(React.createElement('div').type, 'span')).toBeFalsy()
    })

    it('returns true for the same type', () => {
      expect(areTypeNamesEqual(React.createElement('div').type, 'div')).toBeTruthy()
      expect(areTypeNamesEqual(React.createElement('span').type, 'span')).toBeTruthy()
    })
  })

  describe('for functional components', () => {
    const MyComponent = createMockComponent('MyComponent')
    const OtherComponent = createMockComponent('OtherComponent')

    it('returns false for different types', () => {
      expect(areTypeNamesEqual(React.createElement(MyComponent).type, OtherComponent)).toBeFalsy()
      expect(areTypeNamesEqual(React.createElement(MyComponent).type, 'OtherComponent')).toBeFalsy()
    })

    it('returns true for the same type', () => {
      expect(areTypeNamesEqual(React.createElement(MyComponent).type, MyComponent)).toBeTruthy()
      expect(
        areTypeNamesEqual(React.createElement(OtherComponent).type, 'OtherComponent'),
      ).toBeTruthy()
    })
  })
})
