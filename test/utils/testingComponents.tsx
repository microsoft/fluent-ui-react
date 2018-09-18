import * as React from 'react'
import { mount, shallow } from 'enzyme'

import Provider from 'src/components/Provider'
import { FocusZone } from '../../src/lib/accessibility/FocusZone'

export const withProvider = element => <Provider theme={{}}>{element}</Provider>

export const mountWithProvider = (Element: React.ReactNode, options?: {}) =>
  mount(withProvider(Element), options)

export const getTestingMountedRenderedComponent = (
  Component: any,
  Element: React.ReactNode,
  options?: {},
) => {
  return mountWithProvider(Element, options).find(Component)
}

export const shallowWithProvider = (Element: React.ReactNode, options?: {}) =>
  shallow(withProvider(Element), options)

export const getTestingRenderedComponent = (
  Component: any,
  Element: React.ReactNode,
  options?: {},
) => {
  const element = shallowWithProvider(Element, options).dive('FelaTheme')
  if (element.dive(FocusZone).length > 0) {
    return element
      .dive(FocusZone)
      .dive('div')
      .dive(Component)
  }
  return element.dive(Component)
}
