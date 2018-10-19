import * as React from 'react'
import { mount } from 'enzyme'

import Provider from 'src/components/Provider/Provider'
import { ThemeInput } from '../../src/themes/types'

export const withProvider = (element: React.ReactNode, theme?: ThemeInput) => (
  <Provider theme={theme || { siteVariables: {} }}>{element}</Provider>
)

export const mountWithProvider = (Element: React.ReactNode, options?: {}, theme?: ThemeInput) =>
  mount(withProvider(Element, theme), options)

export const getTestingRenderedComponent = (
  Component: any,
  Element: React.ReactNode,
  options?: {},
  theme?: ThemeInput,
) => {
  return mountWithProvider(Element, options, theme).find(Component)
}
