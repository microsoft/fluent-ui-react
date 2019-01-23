import * as React from 'react'
import * as _ from 'lodash'
import { shallow } from 'enzyme'
import { createShorthand, createShorthandFactory } from 'src/lib'
import { Props, ShorthandValue, ObjectOf, ShorthandRenderFunction } from 'types/utils'
import { consoleUtil } from 'test/utils'
import callable from '../../../src/lib/callable'

// ----------------------------------------
// Utils
// ----------------------------------------

type ShorthandConfig = {
  Component?: React.ReactType
  defaultProps?: Props
  mappedProp?: string
  overrideProps?: Props & ((props: Props) => Props) | Props
  generateKey?: boolean
  value?: ShorthandValue
  render?: ShorthandRenderFunction
}

/**
 * Returns the result of a shorthand factory.
 */
const getShorthand = ({
  Component = 'div',
  defaultProps,
  mappedProp = '',
  overrideProps,
  generateKey,
  value,
  render,
}: ShorthandConfig) =>
  createShorthand(Component, mappedProp, value, {
    defaultProps,
    overrideProps,
    generateKey,
    render,
  })

const isValuePrimitive = (value: ShorthandValue) =>
  typeof value === 'string' || typeof value === 'number'

const testCreateShorthand = (shorthandArgs: ShorthandConfig, expectedResult: ObjectOf<any>) =>
  expect(shallow(getShorthand(shorthandArgs)).props()).toEqual(expectedResult)

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

const itReturnsAValidElement = value => {
  test('returns a valid element', () => {
    expect(React.isValidElement(getShorthand({ value }))).toBe(true)
  })
}

const itAppliesDefaultProps = (value: ShorthandValue) => {
  test('applies defaultProps', () => {
    const defaultProps = { some: 'defaults' }
    const expectedResult = isValuePrimitive(value)
      ? { ...defaultProps, children: value }
      : defaultProps

    testCreateShorthand({ value, defaultProps }, expectedResult)
  })
}

const itDoesNotIncludePropsFromMappedProp = value => {
  test('does not include props from mappedProp', () => {
    const mappedProp = 'data-foo'
    const wrapper = shallow(getShorthand({ value, mappedProp }))

    expect(wrapper.prop(mappedProp)).not.toBeDefined()
  })
}

const itMergesClassNames = (
  classNameSource: string,
  extraClassName: string,
  shorthandConfig: { value?: ShorthandValue; mappedProp?: string },
) => {
  test(`merges defaultProps className and ${classNameSource} className`, () => {
    const defaultProps = { className: 'default' }
    const overrideProps = { className: 'override' }

    let expectedClassNames = 'default override'
    if (!isValuePrimitive(shorthandConfig.value)) {
      expectedClassNames += ` ${extraClassName}`
    }

    expect(
      shallow(getShorthand({ defaultProps, overrideProps, ...shorthandConfig })).hasClass(
        expectedClassNames,
      ),
    ).toBe(true)
  })
}

const itAppliesProps = (
  propsSource: string,
  expectedProps: Props,
  shorthandConfig: ShorthandConfig,
) => {
  test(`applies props from the ${propsSource} props`, () => {
    testCreateShorthand(shorthandConfig, expectedProps)
  })
}

const itOverridesDefaultProps = (propsSource, defaultProps, expectedProps, shorthandConfig) => {
  test(`overrides defaultProps with ${propsSource} props`, () => {
    testCreateShorthand({ defaultProps, ...shorthandConfig }, expectedProps)
  })
}

const mappedProps = {
  iframe: 'src',
  img: 'src',
  input: 'type',
}

const itOverridesDefaultPropsWithFalseyProps = (propsSource, shorthandConfig) => {
  test(`overrides defaultProps with falsey ${propsSource} props`, () => {
    const defaultProps = { undef: '-', nil: '-', zero: '-', empty: '-' }
    const expectedProps = { undef: undefined, nil: null, zero: 0, empty: '' }

    testCreateShorthand({ defaultProps, ...shorthandConfig }, expectedProps)
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
      const goodUsage = () => createShorthandFactory(() => <div />, 'children')

      expect(goodUsage).not.toThrowError()
    })

    test('does not throw if passed a string Component', () => {
      const goodUsage = () => createShorthandFactory('div', '')

      expect(goodUsage).not.toThrowError()
    })

    test('does not throw if do not passed `mappedProp`', () => {
      const goodUsage = () => createShorthandFactory(() => <div />)

      expect(goodUsage).not.toThrowError()
    })

    test('throw if passed Component that is not a string nor function', () => {
      consoleUtil.disableOnce()
      const badComponents: any = [undefined, null, true, false, [], {}, 123]

      _.each(badComponents, badComponent => {
        const badUsage = () => createShorthandFactory(badComponent, '')

        expect(badUsage).toThrowError()
      })
    })
  })

  describe('createShorthand', () => {
    test('is a function', () => {
      expect(typeof createShorthand).toBe('function')
    })

    test('does not throw if passed a function Component', () => {
      const goodUsage = () => createShorthand(() => <div />, '')

      expect(goodUsage).not.toThrowError()
    })

    test('does not throw if passed a string Component', () => {
      const goodUsage = () => createShorthand('div', '')

      expect(goodUsage).not.toThrowError()
    })

    test('throw if passed Component that is not a string nor function', () => {
      consoleUtil.disableOnce()
      const badComponents: any[] = [undefined, null, true, false, [], {}, 123]

      _.each(badComponents, badComponent => {
        const badUsage = () => createShorthand(badComponent, '')

        expect(badUsage).toThrowError()
      })
    })

    describe('render callback', () => {
      test('returns the same React element as if shorthand value would be passed directly', () => {
        const createShorthandElement = valueOrRenderCallback =>
          getShorthand({
            value: valueOrRenderCallback,
            Component: 'div',
            defaultProps: {
              baz: 'original',
            },
            overrideProps: {
              baz: 'overriden',
            },
          })

        const shorthandValue = { dataFoo: 'bar' }

        const elementFromShorthandValue = createShorthandElement(shorthandValue)
        const elementFromRenderCallback = createShorthandElement(render => render(shorthandValue))

        expect(elementFromShorthandValue.type).toEqual(elementFromRenderCallback.type)
        expect(elementFromShorthandValue.props).toEqual(elementFromRenderCallback.props)
      })

      describe('custom tree renderer', () => {
        test('passes evaluated Component type as the first argument', () => {
          getShorthand({
            value: render =>
              render({}, (Component, props) => {
                expect(Component).toBe('span')
              }),
            Component: 'span',
          })
        })

        test('passes evaluated props as the second argument', () => {
          const shorthandProps = { bar: 'foo' }

          getShorthand({
            value: render =>
              render(shorthandProps, (Component, props) => {
                expect(props.bar).toBe(shorthandProps.bar)
              }),
          })
        })

        test('overrides render prop from shorthand options', () => {
          const CustomComponent = 'overriden-div' as any

          const shorthandElement = getShorthand({
            value: render => render({}, (Component, props) => <CustomComponent />),
            render: (Component, props) => <div>Default</div>,
          })

          expect(shorthandElement.type).toBe(CustomComponent)
        })
      })
    })

    describe('styles', () => {
      test('deep merges styles prop onto defaultProps styles', () => {
        expect.assertions(1)

        const defaultProps = {
          styles: {
            color: 'override me',
            ':hover': { color: 'blue' },
          },
        }
        const props = {
          styles: { color: 'black' },
        }

        getShorthand({
          value: render =>
            render(props, (Component, props) => {
              expect(callable(props.styles)()).toMatchObject({
                color: 'black',
                ':hover': { color: 'blue' },
              })
            }),
          Component: 'p',
          defaultProps,
        })
      })

      test('deep merges overrideProps styles onto styles prop', () => {
        expect.assertions(1)

        const overrideProps = {
          styles: {
            color: 'black',
            ':hover': {
              color: 'blue',
            },
          },
        }
        const props = {
          styles: {
            position: 'keep',
            color: 'override',
            ':hover': {
              position: 'keep',
              color: 'override',
            },
          },
        }

        getShorthand({
          value: render =>
            render(props, (Component, props) => {
              expect(callable(props.styles)()).toMatchObject({
                position: 'keep',
                color: 'black',
                ':hover': {
                  position: 'keep',
                  color: 'blue',
                },
              })
            }),
          Component: 'p',
          overrideProps,
        })
      })

      test('deep merges styles prop as function onto defaultProps styles', () => {
        expect.assertions(1)

        const defaultProps = {
          styles: () => ({
            color: 'override me',
            ':hover': { color: 'blue' },
          }),
        }
        const props = {
          styles: { color: 'black' },
        }

        getShorthand({
          value: render =>
            render(props, (Component, props) => {
              expect(callable(props.styles)()).toMatchObject({
                color: 'black',
                ':hover': { color: 'blue' },
              })
            }),
          Component: 'p',
          defaultProps,
        })
      })

      test('deep merges overrideProps styles as function onto styles prop', () => {
        expect.assertions(1)

        const overrideProps = {
          styles: () => ({
            color: 'black',
            ':hover': {
              color: 'blue',
            },
          }),
        }
        const props = {
          styles: {
            position: 'keep',
            color: 'override',
            ':hover': {
              position: 'keep',
              color: 'override',
            },
          },
        }

        getShorthand({
          value: render =>
            render(props, (Component, props) => {
              expect(callable(props.styles)()).toMatchObject({
                position: 'keep',
                color: 'black',
                ':hover': {
                  position: 'keep',
                  color: 'blue',
                },
              })
            }),
          Component: 'p',
          overrideProps,
        })
      })
    })

    describe('defaultProps', () => {
      test('can be an object', () => {
        const defaultProps = { 'data-some': 'defaults' }
        testCreateShorthand({ defaultProps, value: 'foo' }, { ...defaultProps, children: 'foo' })
      })
    })

    describe('key', () => {
      beforeEach(() => {
        // silence React's warning about accessing the `key` prop
        consoleUtil.disableOnce()
      })

      test('is not consumed', () => {
        expect(getShorthand({ value: { key: 123 } }).props).toHaveProperty('key')
      })

      describe('on an element', () => {
        test('works with a string', () => {
          expect(getShorthand({ value: <div key="foo" /> })).toHaveProperty('key', 'foo')
        })

        test('works with a number', () => {
          expect(getShorthand({ value: <div key={123} /> })).toHaveProperty('key', '123')
        })

        test('works with falsy values', () => {
          expect(getShorthand({ value: <div key={null} /> })).toHaveProperty('key', 'null')

          expect(getShorthand({ value: <div key={0} /> })).toHaveProperty('key', '0')

          expect(getShorthand({ value: <div key="" /> })).toHaveProperty('key', '')
        })
      })

      describe('on an object', () => {
        test('works with a string', () => {
          expect(getShorthand({ value: { key: 'foo' } })).toHaveProperty('key', 'foo')
        })

        test('works with a number', () => {
          expect(getShorthand({ value: { key: 123 } })).toHaveProperty('key', '123')
        })

        test('works with falsy values', () => {
          expect(getShorthand({ value: { key: null } })).toHaveProperty('key', 'null')

          expect(getShorthand({ value: { key: 0 } })).toHaveProperty('key', '0')

          expect(getShorthand({ value: { key: '' } })).toHaveProperty('key', '')
        })
      })

      describe('when value is a string', () => {
        test('is generated from the value', () => {
          expect(getShorthand({ value: 'foo' })).toHaveProperty('key', 'foo')
        })

        test('is not generated if generateKey is false', () => {
          expect(getShorthand({ value: 'foo', generateKey: false })).toHaveProperty('key', null)
        })
      })

      describe('when value is a number', () => {
        test('is generated from the value', () => {
          expect(getShorthand({ value: 123 })).toHaveProperty('key', '123')
        })

        test('is not generated if generateKey is false', () => {
          expect(getShorthand({ value: 123, generateKey: false })).toHaveProperty('key', null)
        })
      })
    })

    describe('overrideProps', () => {
      const testValue = 'foo'

      test('can be an object', () => {
        const overrideProps = { 'data-some': 'overrides' }

        testCreateShorthand(
          { overrideProps, value: testValue },
          { ...overrideProps, children: testValue },
        )
      })

      test('can be a function that returns defaultProps', () => {
        const overrideProps = () => ({ 'data-some': 'overrides', children: testValue })

        testCreateShorthand({ overrideProps, value: testValue }, overrideProps())
      })

      test("is called with the user's element's and default props", () => {
        const defaultProps = { 'data-some': 'defaults' }
        const overrideProps = jest.fn(() => ({}))
        const userProps = { 'data-user': 'props' }
        const value = <div {...userProps} />

        shallow(getShorthand({ defaultProps, overrideProps, value }))
        expect(overrideProps).toHaveBeenCalledWith({ ...defaultProps, ...userProps })
      })

      test("is called with the user's props object", () => {
        const defaultProps = { 'data-some': 'defaults' }
        const overrideProps = jest.fn(() => ({}))
        const userProps = { 'data-user': 'props' }

        shallow(getShorthand({ defaultProps, overrideProps, value: userProps }))
        expect(overrideProps).toHaveBeenCalledWith({ ...defaultProps, ...userProps })
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

    describe('from an element', () => {
      itReturnsAValidElement(<div />)
      itAppliesDefaultProps(<div />)
      itDoesNotIncludePropsFromMappedProp(<div />)
      itMergesClassNames('element', 'user', { value: <div className="user" /> })
      itAppliesProps('element', { foo: 'foo' }, { value: <div {...{ foo: 'foo' } as any} /> })
      itOverridesDefaultProps(
        'element',
        { some: 'defaults', overridden: false },
        { some: 'defaults', overridden: true },
        { value: <div {...{ overridden: true } as any} /> },
      )
      itOverridesDefaultPropsWithFalseyProps('element', {
        value: <div {...{ undef: undefined, nil: null, zero: 0, empty: '' } as any} />,
      })
    })

    describe('from a string', () => {
      itReturnsAValidElement('foo')
      itAppliesDefaultProps('foo')
      itMergesClassNames('mappedProp', 'mapped', {
        value: 'foo',
        mappedProp: 'className',
      })

      itAppliesProps(
        'mappedProp',
        { 'data-prop': 'foo' },
        {
          value: 'foo',
          mappedProp: 'data-prop',
        },
      )

      itOverridesDefaultProps(
        'mappedProp',
        { some: 'defaults', overridden: 'false' },
        { some: 'defaults', overridden: 'true' },
        {
          value: 'true',
          mappedProp: 'overridden',
        },
      )

      const mappedProp = 'test-mapped-prop'
      const value = 'test-value'

      describe(`when sending HTML tag `, () => {
        _.forEach(mappedProps, (val, as) => {
          const testMsg = `spreads { ${[mappedProps[as]]}: '${value}' }`

          describe(`'${as}' as 'as' prop to defaultProps`, () => {
            test(`overrides ${mappedProp} and ${testMsg}`, () => {
              testCreateShorthand(
                { mappedProp, value, defaultProps: { as } },
                { as, [mappedProps[as]]: value },
              )
            })
          })

          describe(`'${as}' as 'as' prop to overrideProps`, () => {
            test(`overrides ${mappedProp} and ${testMsg}`, () => {
              testCreateShorthand(
                { mappedProp, value, overrideProps: { as } },
                { as, [mappedProps[as]]: value },
              )
            })
          })

          describe(`'${as}' as 'as' prop to overrideProps`, () => {
            test(`overrides defaultProps, ${mappedProp} and ${testMsg}`, () => {
              testCreateShorthand(
                { mappedProp, value, defaultProps: { as: 'overriden' }, overrideProps: { as } },
                { as, [mappedProps[as]]: value },
              )
            })
          })
        })
      })

      describe(`when sending ${mappedProp} as mappedProp`, () => {
        const testMsg = `spreads { ${[mappedProp]}: '${value}' }`

        describe(`and an unsupported tag as 'as' prop to defaultProps`, () => {
          test(testMsg, () => {
            testCreateShorthand(
              { mappedProp, value, defaultProps: { as: 'unsupported' } },
              { as: 'unsupported', [mappedProp]: value },
            )
          })
        })

        describe(`and an unsupported tag as 'as' prop to overrideProps`, () => {
          test(testMsg, () => {
            testCreateShorthand(
              { mappedProp, value, overrideProps: { as: 'unsupported' } },
              { as: 'unsupported', [mappedProp]: value },
            )
          })
        })

        describe(`an unsupported tag as 'as' prop to overrideProps and a supported tag to defaultProps`, () => {
          test(testMsg, () => {
            testCreateShorthand(
              {
                mappedProp,
                value,
                defaultProps: { as: 'div' },
                overrideProps: { as: 'unsupported' },
              },
              { as: 'unsupported', [mappedProp]: value },
            )
          })
        })
      })

      describe(`when sending no mappedProp`, () => {
        const testMsg = `spreads { children: '${value}' } by default`

        describe(`and an unsupported tag as 'as' prop to defaultProps`, () => {
          test(testMsg, () => {
            testCreateShorthand(
              { value, defaultProps: { as: 'unsupported' } },
              { as: 'unsupported', children: value },
            )
          })
        })

        describe(`and an unsupported tag as 'as' prop to overrideProps`, () => {
          test(testMsg, () => {
            testCreateShorthand(
              { value, overrideProps: { as: 'unsupported' } },
              { as: 'unsupported', children: value },
            )
          })
        })

        describe(`an unsupported tag as 'as' prop to overrideProps and a supported tag to defaultProps`, () => {
          test(testMsg, () => {
            testCreateShorthand(
              { value, defaultProps: { as: 'div' }, overrideProps: { as: 'unsupported' } },
              { as: 'unsupported', children: value },
            )
          })
        })
      })
    })

    describe('from a props object', () => {
      itReturnsAValidElement({})
      itAppliesDefaultProps({})
      itDoesNotIncludePropsFromMappedProp({})
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

    describe('style', () => {
      test('merges style prop', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })

      test('merges style prop and handles override by userProps', () => {
        const defaultProps = { style: { left: 10, bottom: 5 } }
        const userProps = { style: { bottom: 10 } }

        expect(shallow(getShorthand({ defaultProps, value: userProps })).prop('style')).toEqual({
          left: 10,
          bottom: 10,
        })
      })

      test('merges style prop and handles override by overrideProps', () => {
        const userProps = { style: { bottom: 10, right: 5 } }
        const overrideProps = { style: { right: 10 } }

        expect(shallow(getShorthand({ overrideProps, value: userProps })).prop('style')).toEqual({
          bottom: 10,
          right: 10,
        })
      })

      test('merges style prop from defaultProps and overrideProps', () => {
        const defaultProps = { style: { left: 10, bottom: 5 } }
        const overrideProps = { style: { bottom: 10 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: 'foo' })).prop('style'),
        ).toEqual({ left: 10, bottom: 10 })
      })
    })
  })
})
