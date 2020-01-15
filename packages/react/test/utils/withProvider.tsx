import { ThemeInput } from '@fluentui/styles'
import * as React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'react-fela'
import { felaRenderer } from '@fluentui/react'

export const EmptyThemeProvider: React.FunctionComponent = ({ children }) => (
  <ThemeProvider theme={{ renderer: felaRenderer, target: document }}>{children}</ThemeProvider>
)

export const mountWithProvider = (node, options?, theme?: ThemeInput) => {
  return mount(node, {
    wrappingComponent: EmptyThemeProvider,
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
