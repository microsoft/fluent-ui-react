import * as React from 'react'
import { mount } from './isConformant'

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

    describe(`shorthand property '${shorthandProp}' with default value of '${displayName}' component`, () => {
      test(`is defined`, () => {
        expect(Component.propTypes[shorthandProp]).toBeTruthy()
      })

      test(`string value is handled as ${displayName}'s ${mapsValueToProp}`, () => {
        const props = { [shorthandProp]: 'some value' }
        const wrapper = mount(<Component {...props} />)

        const shorthandComponentProps = wrapper.find(displayName).props()
        expect(shorthandComponentProps[mapsValueToProp]).toEqual('some value')
      })

      test(`object value is spread as ${displayName}'s props`, () => {
        const ShorthandValue = { foo: 'foo value', bar: 'bar value' }

        const props = { [shorthandProp]: ShorthandValue }
        const wrapper = mount(<Component {...props} />)

        const shorthandComponentProps = wrapper.find(displayName).props()

        const allShorthandPropertiesArePassedToShorthandComponent = Object.keys(
          ShorthandValue,
        ).every(
          propertyName => ShorthandValue[propertyName] === shorthandComponentProps[propertyName],
        )

        expect(allShorthandPropertiesArePassedToShorthandComponent).toBe(true)
      })
    })
  }
}
