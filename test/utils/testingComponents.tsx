import * as React from 'react'
import { mount } from 'enzyme'

import Provider from 'src/components/Provider'
import { IThemeInput } from 'theme'

export const withProvider = (element: React.ReactNode, theme?: IThemeInput) => (
  <Provider theme={theme || {}}>{element}</Provider>
)

export const mountWithProvider = (Element: React.ReactNode, options?: {}, theme?: IThemeInput) =>
  mount(withProvider(Element, theme), options)

export const getTestingRenderedComponent = (
  Component: any,
  Element: React.ReactNode,
  options?: {},
  theme?: IThemeInput,
) => {
  return mountWithProvider(Element, options, theme).find(Component)
}
