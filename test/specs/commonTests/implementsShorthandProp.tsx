import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'

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

    /**
     * @param {ReactWrapper} wrapper [mounted Component]
     * @param {(n: ReactWrapper) => boolean} propsCheckFn [boolean function that applies a boolean check on a mounted ShorthandComponent]
     * return true if the ShorthandComponent that matches propsCheckFn is found
     */
    const testShorthandComponentProps = (
      wrapper: ReactWrapper,
      propsCheckFn: (n: ReactWrapper) => boolean,
    ) => {
      const shorthandComponent = wrapper.findWhere(
        n => n.type() === ShorthandComponent && propsCheckFn(n),
      )
      expect(shorthandComponent.length).toEqual(1)
    }

    describe(`shorthand property '${shorthandProp}' with default value of '${displayName}' component`, () => {
      test(`is defined`, () => {
        expect(Component.propTypes[shorthandProp]).toBeTruthy()
      })

      test(`string value is handled as ${displayName}'s ${mapsValueToProp}`, () => {
        const shorthandPropValue = 'shorthand prop value'
        const props = { [shorthandProp]: shorthandPropValue }

        testShorthandComponentProps(
          mount(<Component {...props} />),
          n => n.prop(mapsValueToProp) === shorthandPropValue,
        )
      })

      test(`object value is spread as ${displayName}'s props`, () => {
        const ShorthandValue = { foo: 'foo value', bar: 'bar value' }
        const props = { [shorthandProp]: ShorthandValue }
        const checkPropsAreSpread = (props: {}) =>
          Object.keys(ShorthandValue).every(
            propName => ShorthandValue[propName] === props[propName],
          )

        testShorthandComponentProps(mount(<Component {...props} />), n =>
          checkPropsAreSpread(n.props()),
        )
      })
    })
  }
}
