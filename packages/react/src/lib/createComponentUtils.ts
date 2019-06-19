import * as React from 'react'
import * as _ from 'lodash'
import { prepareComponentConfig } from './renderComponent'
// @ts-ignore
import { ThemeContext } from 'react-fela'
import { ProviderContextPrepared } from '../types'

// the set of bits provided for now - may be extended
export type StardustBits = Record<'styles' | 'classes' | 'accessibility', any>

export const withStardust = <Props>(
  displayName: string,
  getProps: () => Props,
  getState?: () => any,
): ((context: any) => StardustBits) => {
  return context => {
    const config = prepareComponentConfig(
      {
        displayName,
        className: `ui-${_.kebabCase(displayName)}`, // default value, not exported for now
        handledProps: [], // default, may be extended and configured
        props: getProps(),
        state: getState(),
        actionHandlers: undefined,
      },
      context,
    )

    return {
      styles: config.styles,
      classes: config.classes,
      accessibility: config.accessibility,
    }
  }
}

export const useStardust = <Props>(displayName: string, props: Props, state?: any) => {
  const context = React.useContext(ThemeContext) as ProviderContextPrepared

  const config = prepareComponentConfig(
    {
      displayName,
      className: `ui-${_.kebabCase(displayName)}`, // default value, not exported for now
      handledProps: [], // default, may be extended and configured
      props,
      state,
      actionHandlers: undefined,
    },
    context,
  )

  return config
}
