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
    })
  })
})
