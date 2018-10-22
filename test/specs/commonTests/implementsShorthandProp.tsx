import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { Props } from '../../../types/utils'

export type ShorthandTestOptions = {
  mapsValueToProp?: string
}

export const DefaultShorthandTestOptions: ShorthandTestOptions = {
  mapsValueToProp: 'content',
}

export default Component => {
  return function implementsShorthandProp(
    shorthandProp: string,
    ShorthandComponent: React.ComponentType,
    options: ShorthandTestOptions = DefaultShorthandTestOptions,
  ) {
    const { mapsValueToProp } = options
    const { displayName } = ShorthandComponent

    const checkPropsMatch = (props: Props, matchedProps: Props) =>
      Object.keys(matchedProps).every(propName => matchedProps[propName] === props[propName])

    const expectContainsSingleShorthandElement = (wrapper: ReactWrapper, withProps: Props) =>
      expect(
        wrapper.findWhere(
          node => node.type() === ShorthandComponent && checkPropsMatch(node.props(), withProps),
        ).length,
      ).toEqual(1)

    const expectShorthandPropsAreHandled = (withProps: Props | string) => {
      const props = { [shorthandProp]: withProps }
      const matchedProps =
        typeof withProps === 'string' ? { [mapsValueToProp]: withProps } : withProps

      expectContainsSingleShorthandElement(mount(<Component {...props} />), matchedProps)
    }

    describe(`shorthand property '${shorthandProp}' with default value of '${displayName}' component`, () => {
      test(`is defined`, () => {
        expect(Component.propTypes[shorthandProp]).toBeTruthy()
      })

      test(`string value is handled as ${displayName}'s ${mapsValueToProp}`, () => {
        expectShorthandPropsAreHandled('shorthand prop value')
      })

      test(`object value is spread as ${displayName}'s props`, () => {
        expectShorthandPropsAreHandled({ foo: 'foo value', bar: 'bar value' })
      })
    })
  }
}
