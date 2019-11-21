import * as _ from 'lodash'
import * as React from 'react'

/**
 * Assert a component exposes other components as (static properties).
 * @param Component - The Component.
 * @param subcomponents - Array of components that should exist on Component.
 */
export default (Component: React.ComponentType, subcomponents: React.ComponentType[]) => {
  const staticValues = _.values(Component)

  _.each(subcomponents, subcomponent => {
    it(`has sub component ${(subcomponent as any)._meta.name}`, () => {
      staticValues.should.contain(subcomponent)
    })
  })
}
