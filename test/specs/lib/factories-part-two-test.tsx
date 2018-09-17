import * as _ from 'lodash'
import { shallow } from 'enzyme'
import * as React from 'react'
import { createShorthand } from 'src/lib'

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

const itReturnsAValidElement = value => {
  test('returns a valid element', () => {
    expect(React.isValidElement(getShorthand({ value }))).toBe(true)
  })
}

const itAppliesDefaultProps = value => {
  test('applies defaultProps', () => {
    const defaultProps = { some: 'defaults' }

    expect(shallow(getShorthand({ value, defaultProps })).props()).toEqual(defaultProps)
  })
}

const itDoesNotIncludePropsFromMapValueToProps = value => {
  test('does not include props from mapValueToProps', () => {
    const props = { 'data-foo': 'foo' }
    const wrapper = shallow(getShorthand({ value, mapValueToProps: () => props }))

    _.each(props, (val, key) => {
      expect(wrapper.props()).not.toHaveProperty(key, val)
    })
  })
}

const itMergesClassNames = (classNameSource, extraClassName, shorthandConfig) => {
  test(`merges defaultProps className and ${classNameSource} className`, () => {
    const defaultProps = { className: 'default' }
    const overrideProps = { className: 'override' }

    expect(
      shallow(getShorthand({ defaultProps, overrideProps, ...shorthandConfig })).hasClass(
        `default override ${extraClassName}`,
      ),
    ).toBe(true)
  })
}

const itAppliesProps = (propsSource, expectedProps, shorthandConfig) => {
  test(`applies props from the ${propsSource} props`, () => {
    expect(shallow(getShorthand(shorthandConfig)).props()).toEqual(expectedProps)
  })
}

const itOverridesDefaultProps = (propsSource, defaultProps, expectedProps, shorthandConfig) => {
  test(`overrides defaultProps with ${propsSource} props`, () => {
    expect(shallow(getShorthand({ defaultProps, ...shorthandConfig })).props()).toEqual(
      expectedProps,
    )
  })
}

const itOverridesDefaultPropsWithFalseyProps = (propsSource, shorthandConfig) => {
  test(`overrides defaultProps with falsey ${propsSource} props`, () => {
    const defaultProps = { undef: '-', nil: '-', zero: '-', empty: '-' }
    const expectedProps = { undef: undefined, nil: null, zero: 0, empty: '' }

    expect(shallow(getShorthand({ defaultProps, ...shorthandConfig })).props()).toEqual(
      expectedProps,
    )
  })
}

// ----------------------------------------
// Assertions
// ----------------------------------------

describe('factories', () => {
  describe('createShorthand', () => {
    describe('overrideProps', () => {
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

      test('is called with the result of mapValueToProps', () => {
        const defaultProps = { 'data-some': 'defaults' }
        const overrideProps = jest.fn(() => ({}))
        const value = 'foo'
        const mapValueToProps = val => ({ 'data-mapped': val })

        shallow(getShorthand({ defaultProps, mapValueToProps, overrideProps, value }))
        expect(overrideProps).toHaveBeenCalledWith({ ...defaultProps, ...mapValueToProps(value) })
      })
    })

    describe('from an element', () => {
      itReturnsAValidElement(<div />)
      itAppliesDefaultProps(<div />)
      itDoesNotIncludePropsFromMapValueToProps(<div />)
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
    })

    describe('from a props object', () => {
      itReturnsAValidElement({})
    })

    describe('from a function', () => {
      itReturnsAValidElement(() => <div />)
      itDoesNotIncludePropsFromMapValueToProps(() => <div />)
    })
  })
})
