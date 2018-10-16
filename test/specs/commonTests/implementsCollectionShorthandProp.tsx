import * as React from 'react'
import { mount } from './isConformant'
import * as _ from 'lodash'

export type CollectionShorthandTestOptions = {
  mapsValueToProp?: string
  skipArrayOfStrings?: boolean
}

export const DefaultCollectionShorthandTestOptions: CollectionShorthandTestOptions = {
  mapsValueToProp: 'content',
  skipArrayOfStrings: false,
}

export default Component => {
  return function implementsCollectionShorthandProp(
    shorthandPropertyName: string,
    ShorthandComponent: React.ComponentType,
    options: CollectionShorthandTestOptions = DefaultCollectionShorthandTestOptions,
  ) {
    const { mapsValueToProp } = options

    describe(`shorthand property for '${ShorthandComponent.displayName}'`, () => {
      test(`is defined`, () => {
        expect(Component.propTypes[shorthandPropertyName]).toBeTruthy()
      })

      if (!options.skipArrayOfStrings) {
        test(`array of string values is spread as ${
          ShorthandComponent.displayName
        }s' ${mapsValueToProp}`, () => {
          const shorthandValue = ['some value', 'some other value']
          const props = { [shorthandPropertyName]: shorthandValue }
          const wrapper = mount(<Component {...props} />)

          const shorthandComponents = wrapper.find(ShorthandComponent.displayName)

          expect(shorthandComponents.first().prop(mapsValueToProp)).toEqual(_.first(shorthandValue))
          expect(shorthandComponents.last().prop(mapsValueToProp)).toEqual(_.last(shorthandValue))
        })
      }

      test(`object value is spread as ${ShorthandComponent.displayName}'s props`, () => {
        const shorthandValue = [
          { key: 'first', foo: 'foo value', bar: 'bar value' },
          { key: 'last', foo: 'foo last value', bar: 'bar last value' },
        ]

        const props = { [shorthandPropertyName]: shorthandValue }
        const wrapper = mount(<Component {...props} />)

        const shorthandComponents = wrapper.find(ShorthandComponent.displayName)

        const allShorthandPropertiesArePassedToFirstShorthandComponent = Object.keys(
          _.first(shorthandValue),
        ).every(
          propertyName =>
            propertyName === 'key' ||
            _.first(shorthandValue)[propertyName] ===
              shorthandComponents.first().prop(propertyName),
        )

        const allShorthandPropertiesArePassedToLastShorthandComponent = Object.keys(
          _.last(shorthandValue),
        ).every(
          propertyName =>
            propertyName === 'key' ||
            _.last(shorthandValue)[propertyName] === shorthandComponents.last().prop(propertyName),
        )

        expect(allShorthandPropertiesArePassedToFirstShorthandComponent).toBe(true)
        expect(allShorthandPropertiesArePassedToLastShorthandComponent).toBe(true)
      })
    })
  }
}
