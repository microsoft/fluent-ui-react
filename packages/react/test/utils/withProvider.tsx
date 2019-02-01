import * as React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'react-fela'
import { felaRenderer } from 'src/lib'
import { ThemeInput } from 'src/themes/types'

export const withProvider = (node: React.ReactElement<any>, theme?: ThemeInput) => (
  <ThemeProvider theme={theme || { renderer: felaRenderer }}>{node}</ThemeProvider>
)

export const mountWithProvider = (node, options?, theme?: ThemeInput) => {
  return mount(withProvider(node, theme), options)
}

export const mountWithProviderAndGetComponent = (
  Component,
  elementToMount,
  options?: {},
  theme?: ThemeInput,
) => {
  return mountWithProvider(elementToMount, options, theme).find(Component)
}
