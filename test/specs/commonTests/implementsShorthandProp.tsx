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
    shorthandPropertyName: string,
    ShorthandComponent: React.ComponentType,
    options: ShorthandTestOptions = DefaultShorthandTestOptions,
  ) {
    const { mapsValueToProp } = options

    describe(`shorthand property for '${ShorthandComponent.displayName}'`, () => {
      test(`is defined`, () => {
        expect(Component.propTypes[shorthandPropertyName]).toBeTruthy()
      })

      test(`string value is handled as ${
        ShorthandComponent.displayName
      }'s ${mapsValueToProp}`, () => {
        const props = { [shorthandPropertyName]: 'some value' }
        const wrapper = mount(<Component {...props} />)

        const shorthandComponentProps = wrapper.find(ShorthandComponent.displayName).props()
        expect(shorthandComponentProps[mapsValueToProp]).toEqual('some value')
      })

      test(`object value is spread as ${ShorthandComponent.displayName}'s props`, () => {
        const ShorthandValue = { foo: 'foo value', bar: 'bar value' }

        const props = { [shorthandPropertyName]: ShorthandValue }
        const wrapper = mount(<Component {...props} />)

        const shorthandComponentProps = wrapper.find(ShorthandComponent.displayName).props()

        const allShorthandPropertiesArePassedToShorthandComponent = Object.keys(
          ShorthandValue,
        ).every(
          propertyName => ShorthandValue[propertyName] === shorthandComponentProps[propertyName],
        )

        expect(allShorthandPropertiesArePassedToShorthandComponent).toBe(true)
      })

      test(`shorthand's styles may be passed as '${shorthandPropertyName}' prop of ${
        Component.displayName
      }'s styles`, () => {
        const props = { [shorthandPropertyName]: 'some value' }

        const wrapper = mount(
          <Component {...props} styles={{ [shorthandPropertyName]: { foo: 'bar' } }} />,
        )
        const shorthandComponentProps = wrapper.find(ShorthandComponent.displayName).props()

        expect(shorthandComponentProps.styles).toBeDefined()
        expect(shorthandComponentProps.styles.root).toEqual({ foo: 'bar' })
      })

      test(`shorthand's variables may be passed as '${shorthandPropertyName}' prop of ${
        Component.displayName
      }'s variables`, () => {
        const props = { [shorthandPropertyName]: 'some value' }

        const wrapper = mount(
          <Component {...props} variables={{ [shorthandPropertyName]: { foo: 'bar' } }} />,
        )
        const shorthandComponentProps = wrapper.find(ShorthandComponent.displayName).props()

        expect(shorthandComponentProps.variables).toBeDefined()
        expect(shorthandComponentProps.variables.foo).toBe('bar')
      })
    })
  }
}
