import * as _ from 'lodash'
import { shallow } from 'enzyme'
import * as React from 'react'
import { createShorthand, createShorthandFactory } from 'src/lib'
import { consoleUtil } from 'test/utils'

jest.mock('react')

// ----------------------------------------
// Utils
// ----------------------------------------
/**
 * Returns the result of a shorthand factory.
 */
const getShorthand = ({
  Component = 'div',
  defaultProps,
  mapValueToProps = () => ({}),
  overrideProps,
  generateKey,
  value,
}: any) =>
  createShorthand(Component, mapValueToProps, value, {
    defaultProps,
    overrideProps,
    generateKey,
  })

// ----------------------------------------
// Common tests
// ----------------------------------------
const itReturnsNull = value => {
  test('returns null', () => {
    consoleUtil.disableOnce()
    expect(getShorthand({ value })).toBe(null)
  })
}

const itReturnsNullGivenDefaultProps = value => {
  test('returns null given defaultProps object', () => {
    consoleUtil.disableOnce()
    expect(getShorthand({ value, defaultProps: { 'data-foo': 'foo' } })).toBe(null)
  })
}

const itAppliesDefaultProps = value => {
  test('applies defaultProps', () => {
    const defaultProps = { some: 'defaults' }
    getShorthand({ value, defaultProps })
    expect(React.createElement).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining(defaultProps),
    )
  })
}

const itDoesNotIncludePropsFromMapValueToProps = value => {
  test('does not include props from mapValueToProps', () => {
    const props = { 'data-foo': 'foo' }
    getShorthand({ value, mapValueToProps: () => props })

    _.each(props, (val, key) => {
      const pair = { [key]: value }
      expect(React.createElement).not.toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining(pair),
      )
    })
  })
}

const itMergesClassNames = (classNameSource, extraClassName, shorthandConfig) => {
  test(`merges defaultProps className and ${classNameSource} className`, () => {
    const defaultProps = { className: 'default' }
    const overrideProps = { className: 'override' }

    getShorthand({ defaultProps, overrideProps, ...shorthandConfig })
    expect(React.createElement).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ className: `default override ${extraClassName}` }),
    )
  })
}

const itAppliesProps = (propsSource, expectedProps, shorthandConfig) => {
  test(`applies props from the ${propsSource} props`, () => {
    getShorthand(shorthandConfig)
    expect(React.createElement).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining(expectedProps),
    )
  })
}

const itOverridesDefaultProps = (propsSource, defaultProps, expectedProps, shorthandConfig) => {
  test(`overrides defaultProps with ${propsSource} props`, () => {
    getShorthand({ defaultProps, ...shorthandConfig })
    expect(React.createElement).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining(expectedProps),
    )
  })
}

const itOverridesDefaultPropsWithFalseyProps = (propsSource, shorthandConfig) => {
  test(`overrides defaultProps with falsey ${propsSource} props`, () => {
    const defaultProps = { undef: '-', nil: '-', zero: '-', empty: '-' }
    const expectedProps = { undef: undefined, nil: null, zero: 0, empty: '' }
    getShorthand({ defaultProps, ...shorthandConfig })
    expect(React.createElement).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining(expectedProps),
    )
  })
}

// ----------------------------------------
// Assertions
// ----------------------------------------
describe('factories', () => {
  describe('createShorthandFactory', () => {
    test('is a function', () => {
      expect(typeof createShorthandFactory).toBe('function')
    })

    test('does not throw if passed a function Component', () => {
      const goodUsage = () => createShorthandFactory(() => <div />, () => ({}))

      expect(goodUsage).not.toThrowError()
    })

    test('does not throw if passed a string Component', () => {
      const goodUsage = () => createShorthandFactory('div', () => ({}))

      expect(goodUsage).not.toThrowError()
    })

    test('throw if passed Component that is not a string nor function', () => {
      consoleUtil.disableOnce()
      const badComponents = [undefined, null, true, false, [], {}, 123]

      _.each(badComponents, badComponent => {
        const badUsage = () => createShorthandFactory(badComponent, () => ({}))

        expect(badUsage).toThrowError()
      })
    })
  })

  describe('createShorthand', () => {
    test('is a function', () => {
      expect(typeof createShorthand).toBe('function')
    })

    test('does not throw if passed a function Component', () => {
      const goodUsage = () => createShorthand(() => <div />, () => ({}))

      expect(goodUsage).not.toThrowError()
    })

    test('does not throw if passed a string Component', () => {
      const goodUsage = () => createShorthand('div', () => ({}))

      expect(goodUsage).not.toThrowError()
    })

    test('throw if passed Component that is not a string nor function', () => {
      consoleUtil.disableOnce()
      const badComponents = [undefined, null, true, false, [], {}, 123]

      _.each(badComponents, badComponent => {
        const badUsage = () => createShorthand(badComponent, () => ({}))

        expect(badUsage).toThrowError()
      })
    })

    describe('defaultProps', () => {
      test('can be an object', () => {
        const defaultProps = { 'data-some': 'defaults' }
        getShorthand({ defaultProps, value: 'foo' })

        expect(React.createElement).toHaveBeenLastCalledWith('div', { ...defaultProps, key: 'foo' })
      })
    })

    describe('key', () => {
      beforeEach(() => {
        // silence React's warning about accessing the `key` prop
        consoleUtil.disableOnce()
      })

      test('is not consumed', () => {
        getShorthand({ value: { key: 123 } })
        expect(React.createElement).toHaveBeenLastCalledWith(
          'div',
          expect.objectContaining({ key: 123 }),
        )
      })

      describe('on an element', () => {
        test('works with a string', () => {
          getShorthand({ value: <div key="foo" /> })
          expect(React.createElement).toHaveBeenCalledWith('div', { key: 'foo' })
        })

        test('works with a number', () => {
          getShorthand({ value: <div key={123} /> })
          expect(React.createElement).toHaveBeenCalledWith('div', { key: 123 })
        })

        test('works with falsy values', () => {
          getShorthand({ value: <div key={null} /> })
          expect(React.createElement).toHaveBeenCalledWith('div', { key: null })

          getShorthand({ value: <div key={0} /> })
          expect(React.createElement).toHaveBeenCalledWith('div', { key: 0 })

          getShorthand({ value: <div key="" /> })
          expect(React.createElement).toHaveBeenCalledWith('div', { key: '' })
        })
      })

      describe('on an object', () => {
        test('works with a string', () => {
          getShorthand({ value: { key: 'foo' } })
          expect(React.createElement).toHaveBeenLastCalledWith('div', { key: 'foo' })
        })

        test('works with a number', () => {
          getShorthand({ value: { key: 123 } })
          expect(React.createElement).toHaveBeenLastCalledWith('div', { key: 123 })
        })

        test('works with falsy values', () => {
          getShorthand({ value: { key: null } })
          expect(React.createElement).toHaveBeenCalledWith('div', { key: null })

          getShorthand({ value: { key: 0 } })
          expect(React.createElement).toHaveBeenCalledWith('div', { key: 0 })

          getShorthand({ value: { key: '' } })
          expect(React.createElement).toHaveBeenCalledWith('div', { key: '' })
        })
      })

      describe('when value is a string', () => {
        test('is generated from the value', () => {
          getShorthand({ value: 'foo' })
          expect(React.createElement).toHaveBeenCalledWith('div', { key: 'foo' })
        })

        test('is not generated if generateKey is false', () => {
          getShorthand({ value: 'foo', generateKey: false })
          expect(React.createElement).toHaveBeenCalledWith('div', { key: null })
        })
      })

      describe('when value is a number', () => {
        test('is generated from the value', () => {
          getShorthand({ value: 123 })
          expect(React.createElement).toHaveBeenCalledWith('div', { key: 123 })
        })

        test('is not generated if generateKey is false', () => {
          getShorthand({ value: 123, generateKey: false })
          expect(React.createElement).toHaveBeenCalledWith('div', { key: null })
        })
      })
    })

    describe('overrideProps', () => {
      test('can be an object', () => {
        const overrideProps = { 'data-some': 'overrides' }
        getShorthand({ overrideProps, value: 'foo' })
        expect(React.createElement).toHaveBeenLastCalledWith('div', {
          ...overrideProps,
          key: 'foo',
        })
      })

      test('can be a function that returns defaultProps', () => {
        const overrideProps = () => ({ 'data-some': 'overrides' })
        getShorthand({ overrideProps, value: 'foo' })
        expect(React.createElement).toHaveBeenLastCalledWith('div', {
          ...overrideProps(),
          key: 'foo',
        })
      })
    })

    describe('from undefined', () => {
      itReturnsNull(undefined)
      itReturnsNullGivenDefaultProps(undefined)
    })

    describe('from null', () => {
      itReturnsNull(null)
      itReturnsNullGivenDefaultProps(null)
    })

    describe('from true', () => {
      itReturnsNull(true)
      itReturnsNullGivenDefaultProps(true)
    })

    describe('from false', () => {
      itReturnsNull(false)
      itReturnsNullGivenDefaultProps(false)
    })

    describe('from a string', () => {
      itAppliesDefaultProps('foo')
      itMergesClassNames('mapValueToProps', 'mapped', {
        value: 'foo',
        mapValueToProps: () => ({ className: 'mapped' }),
      })

      itAppliesProps(
        'mapValueToProps',
        { 'data-prop': 'present' },
        {
          value: 'foo',
          mapValueToProps: () => ({ 'data-prop': 'present' }),
        },
      )

      itOverridesDefaultProps(
        'mapValueToProps',
        { some: 'defaults', overridden: false },
        { some: 'defaults', overridden: true },
        {
          value: 'a string',
          mapValueToProps: () => ({ overridden: true }),
        },
      )

      itOverridesDefaultPropsWithFalseyProps('mapValueToProps', {
        value: 'a string',
        mapValueToProps: () => ({ undef: undefined, nil: null, zero: 0, empty: '' }),
      })
    })

    describe('from a props object', () => {
      itAppliesDefaultProps({})
      itDoesNotIncludePropsFromMapValueToProps({})
      itMergesClassNames('props object', 'user', {
        value: { className: 'user' },
      })

      itOverridesDefaultProps(
        'props object',
        { some: 'defaults', overridden: false },
        { some: 'defaults', overridden: true },
        {
          value: { overridden: true },
        },
      )

      itOverridesDefaultPropsWithFalseyProps('props object', {
        value: { undef: undefined, nil: null, zero: 0, empty: '' },
      })
    })

    describe('from a function', () => {
      test('is called once', () => {
        const spy = jest.fn()

        getShorthand({ value: spy })

        expect(spy).toHaveBeenCalledTimes(1)
      })

      test('is called with Component, props, children', () => {
        const spy = jest.fn(() => <div />)

        getShorthand({ Component: 'p', value: spy })

        expect(spy).toHaveBeenCalledWith('p', {}, undefined)
      })

      test('receives defaultProps in its props argument', () => {
        const spy = jest.fn(() => <div />)
        const defaultProps = { defaults: true }

        getShorthand({ defaultProps, Component: 'p', value: spy })

        expect(spy).toHaveBeenCalledWith('p', defaultProps, undefined)
      })

      test('receives overrideProps in its props argument', () => {
        const spy = jest.fn(() => <div />)
        const overrideProps = { overrides: true }

        getShorthand({ overrideProps, Component: 'p', value: spy })

        expect(spy).toHaveBeenCalledWith('p', overrideProps, undefined)
      })
    })

    describe('from an array', () => {
      itReturnsNull(['foo'])
      itReturnsNullGivenDefaultProps(['foo'])
    })

    describe('style', () => {
      test('merges style prop', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        getShorthand({ defaultProps, overrideProps, value: userProps })
        expect(React.createElement).toHaveBeenLastCalledWith(
          'div',
          expect.objectContaining({
            style: {
              left: 5,
              bottom: 5,
              right: 5,
            },
          }),
        )
      })

      test('merges style prop and handles override by userProps', () => {
        const defaultProps = { style: { left: 10, bottom: 5 } }
        const userProps = { style: { bottom: 10 } }

        getShorthand({ defaultProps, value: userProps })
        expect(React.createElement).toHaveBeenLastCalledWith(
          'div',
          expect.objectContaining({
            style: {
              left: 10,
              bottom: 10,
            },
          }),
        )
      })

      test('merges style prop and handles override by overrideProps', () => {
        const userProps = { style: { bottom: 10, right: 5 } }
        const overrideProps = { style: { right: 10 } }

        getShorthand({ overrideProps, value: userProps })
        expect(React.createElement).toHaveBeenLastCalledWith(
          'div',
          expect.objectContaining({
            style: {
              bottom: 10,
              right: 10,
            },
          }),
        )
      })

      test('merges style prop from defaultProps and overrideProps', () => {
        const defaultProps = { style: { left: 10, bottom: 5 } }
        const overrideProps = { style: { bottom: 10 } }

        getShorthand({ defaultProps, overrideProps, value: 'foo' })
        expect(React.createElement).toHaveBeenLastCalledWith(
          'div',
          expect.objectContaining({
            style: {
              left: 10,
              bottom: 10,
            },
          }),
        )
      })
    })
  })
})
