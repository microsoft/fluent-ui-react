import * as React from 'react'
import * as _ from 'lodash'
// @ts-ignore
import { ThemeContext } from '@stardust-ui/react-fela'

import renderComponent, { RenderResultConfig } from './renderComponent'
import { AccessibilityActionHandlers } from './accessibility/reactTypes'
import { createShorthandFactory } from './factories'
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
  create: Function
}

const createComponent = <P extends ObjectOf<any> = any>({
  displayName = 'StardustComponent',
  className = 'ui-stardust-component',
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

  const StardustComponent: CreateComponentReturnType<P> = (props): React.ReactElement<P> => {
    const context: ProviderContextPrepared = React.useContext(ThemeContext)

    return renderComponent(
      {
        className,
        defaultProps,
        displayName,
        handledProps: _.keys(propTypes).concat(handledProps),
        props,
        state: {},
        actionHandlers,
        render: config => render(config, props),
      },
      context,
    )
  }

  StardustComponent.className = className

  StardustComponent.create = createShorthandFactory({
    Component: mergedDefaultProps.as,
    mappedProp: shorthandPropName,
  })

  StardustComponent.displayName = displayName

  StardustComponent.propTypes = propTypes // TODO: generate prop types

  StardustComponent.defaultProps = mergedDefaultProps

  return StardustComponent
}

export default createComponent
