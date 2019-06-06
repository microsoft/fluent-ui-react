import * as React from 'react'
import { mount } from 'enzyme'
// @ts-ignore
import { ThemeContext } from 'react-fela'
import { felaRenderer } from 'src/lib'
import { ThemeInput } from 'src/themes/types'

export const MockProvider: React.FunctionComponent = props => (
  <ThemeContext.Provider value={{ renderer: felaRenderer }}>{props.children}</ThemeContext.Provider>
)

export const mountWithProvider = (node, options?, theme?: ThemeInput) => {
  return mount(node, {
    wrappingComponent: MockProvider,
    ...options,
  })
}

export const mountWithProviderAndGetComponent = (
  Component,
  elementToMount,
  options?: {},
  theme?: ThemeInput,
) => {
  return mountWithProvider(elementToMount, options, theme).find(Component)
}
