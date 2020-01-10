import { AccessibilityActionHandlers } from '@fluentui/react-bindings'
import * as React from 'react'
import * as _ from 'lodash'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import renderComponent, { RenderResultConfig } from './renderComponent'
import { createShorthandFactory, ShorthandFactory } from './factories'
import { ObjectOf, ProviderContextPrepared } from '../types'

export interface CreateComponentConfig<P> {
  displayName: string
  className?: string
  shorthandPropName?: string
  defaultProps?: Partial<P>
  handledProps?: string[]
  propTypes?: React.WeakValidationMap<P>
  actionHandlers?: AccessibilityActionHandlers
  render: (config: RenderResultConfig<P>, props: P) => React.ReactNode
}

export type CreateComponentReturnType<P> = React.FunctionComponent<P> & {
  className: string
  create: ShorthandFactory<P>
}

const createComponentInternal = <P extends ObjectOf<any> = any>({
  displayName = 'FluentUIComponent',
  className = 'fluent-ui-component',
  shorthandPropName = 'children',
  defaultProps = {},
  handledProps = [],
  propTypes,
  actionHandlers,
  render,
}: CreateComponentConfig<P>): CreateComponentReturnType<P> => {
  const mergedDefaultProps = {
    as: 'div',
    ...(defaultProps as any),
  }

  const FluentComponent: CreateComponentReturnType<P> = (props): React.ReactElement<P> => {
    // Stores debug information for component.
    // Note that this ref should go as the first one, to be discoverable by debug utils.
    const ref = React.useRef(null)

    const context: ProviderContextPrepared = React.useContext(ThemeContext)

    return renderComponent(
      {
        className,
        displayName,
        handledProps: _.keys(propTypes).concat(handledProps),
        props,
        state: {},
        actionHandlers,
        render: config => render(config, props),
        saveDebug: fluentUIDebug => (ref.current = { fluentUIDebug }),
      },
      context,
    )
  }

  FluentComponent.className = className

  FluentComponent.create = createShorthandFactory({
    Component: mergedDefaultProps.as,
    mappedProp: shorthandPropName,
  })

  FluentComponent.displayName = displayName

  FluentComponent.propTypes = propTypes // TODO: generate prop types

  FluentComponent.defaultProps = mergedDefaultProps

  return FluentComponent
}

export default createComponentInternal
