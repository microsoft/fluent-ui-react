import * as React from 'react'
import * as _ from 'lodash'

import renderComponent, { RenderResultConfig } from './renderComponent'
import { AccessibilityActionHandlers } from './accessibility/types'
import { FocusZone } from './accessibility/FocusZone'
import { createShorthandFactory } from './factories'

export interface CreateComponentConfig<P> {
  displayName: string
  className?: string
  shorthandPropName?: string
  defaultProps?: Partial<P>
  handledProps?: string[]
  propTypes?: React.ValidationMap<P>
  actionHandlers?: AccessibilityActionHandlers
  focusZoneRef?: (focusZone: FocusZone) => void
  render: (this: React.Component<P>, config: RenderResultConfig<P>) => React.ReactNode
}

type CreateComponentReturnType<P> = React.ComponentType<P> & {
  create: Function
}

const createComponent = <P extends {} = {}, S extends {} = {}>({
  displayName = 'StardustComponent',
  className = 'ui-stardust-component',
  shorthandPropName = 'children',
  defaultProps = {},
  handledProps = [],
  propTypes,
  actionHandlers,
  focusZoneRef, // TODO: setFocusZoneRef
  render,
}: CreateComponentConfig<P>): CreateComponentReturnType<P> => {
  const mergedDefaultProps = {
    as: 'div',
    ...(defaultProps as any),
  }

  return class StardustComponent extends React.Component<P, S> {
    static className = className

    static create = createShorthandFactory(mergedDefaultProps.as, val => ({
      [shorthandPropName]: val,
    }))

    static displayName = displayName

    static propTypes = propTypes // TODO: generate prop types

    static defaultProps = mergedDefaultProps

    static unhandledProps: string[] = []

    private static _handledPropsCache: string[] = undefined
    static get handledProps() {
      if (!this._handledPropsCache) {
        this._handledPropsCache = _.difference(
          _.keys(propTypes).concat(handledProps),
          this.unhandledProps,
        ).sort()
      }

      return this._handledPropsCache
    }

    render() {
      return renderComponent({
        className,
        defaultProps,
        displayName,
        handledProps: StardustComponent.handledProps,
        props: this.props,
        state: this.state,
        actionHandlers,
        focusZoneRef,
        render: render.bind(this),
      })
    }
  }
}

export default createComponent
