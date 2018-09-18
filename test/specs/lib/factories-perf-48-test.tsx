import * as _ from 'lodash'
import { shallow } from 'enzyme'
import * as React from 'react'
import { createShorthand, createShorthandFactory } from 'src/lib'
import { consoleUtil } from 'test/utils'

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
// Assertions
// ----------------------------------------

describe('factories', () => {
  describe('createShorthand', () => {
    describe('style', () => {
      test('merges style prop', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 1', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 2', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 3', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 4', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 5', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 6', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 7', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 8', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 9', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 10', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 11', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 12', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 13', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 14', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 15', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 16', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 17', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 18', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 19', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 20', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 21', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 22', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 23', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
    })

    describe('style 1', () => {
      test('merges style prop', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 1', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 2', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 3', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 4', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 5', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 6', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 7', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 8', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 9', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 10', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 11', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 12', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 13', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 14', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 15', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 16', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 17', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 18', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 19', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 20', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 21', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 22', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
      test('merges style prop 23', () => {
        const defaultProps = { style: { left: 5 } }
        const userProps = { style: { bottom: 5 } }
        const overrideProps = { style: { right: 5 } }

        expect(
          shallow(getShorthand({ defaultProps, overrideProps, value: userProps })).prop('style'),
        ).toEqual({ left: 5, bottom: 5, right: 5 })
      })
    })
  })
})
