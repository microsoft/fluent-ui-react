import * as React from 'react'
import * as _ from 'lodash'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import renderComponent, { RenderResultConfig } from './renderComponent'
import { AccessibilityActionHandlers } from './accessibility/reactTypes'
import { createShorthandFactory } from './factories'
import { ObjectOf, Omit, ProviderContextPrepared } from '../types'

export interface CreateComponentConfig<P> {
  displayName: string
  className?: string
  shorthandPropName?: string
  defaultProps?: Partial<P>
  handledProps?: string[]
  propTypes?: React.WeakValidationMap<P>
  actionHandlers?: AccessibilityActionHandlers
  render: (config: Omit<RenderResultConfig<P>, 'wrap'>, props: P) => React.ReactNode
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
  const StardustComponent: CreateComponentReturnType<P> = (props): React.ReactElement<P> => {
    const context: ProviderContextPrepared = React.useContext(ThemeContext)

    const { wrap, ...config } = renderComponent<P>({
      className,
      displayName,
      handledProps: _.keys(propTypes).concat(handledProps),
      props,
      state: {},
      actionHandlers,
      context,
    })

    return wrap(render(config, props))
  }

  StardustComponent.className = className

  StardustComponent.create = createShorthandFactory({
    Component: StardustComponent,
    mappedProp: shorthandPropName,
  })

  StardustComponent.displayName = displayName

  StardustComponent.propTypes = propTypes // TODO: generate prop types

  StardustComponent.defaultProps = defaultProps

  return StardustComponent
}

export default createComponent
