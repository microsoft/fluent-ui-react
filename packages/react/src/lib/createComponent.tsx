import * as React from 'react'
import * as _ from 'lodash'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import renderComponent, { RenderResultConfig } from './renderComponent'
import { AccessibilityActionHandlers } from './accessibility/types'
import { FocusZone } from './accessibility/FocusZone'
import { createShorthandFactory } from './factories'
import { ObjectOf } from '../types'
import { ThemePrepared } from '../themes/types'

export interface CreateComponentConfig<P> {
  displayName: string
  className?: string
  shorthandPropName?: string
  defaultProps?: Partial<P>
  handledProps?: string[]
  propTypes?: React.WeakValidationMap<P>
  actionHandlers?: AccessibilityActionHandlers
  focusZoneRef?: (focusZone: FocusZone) => void
  render: (config: RenderResultConfig<P>, props: P) => React.ReactNode
}

export type CreateComponentReturnType<P> = React.FunctionComponent<P> & {
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
  focusZoneRef, // TODO: setFocusZoneRef
  render,
}: CreateComponentConfig<P>): CreateComponentReturnType<P> => {
  const mergedDefaultProps = {
    as: 'div',
    ...(defaultProps as any),
  }

  const StardustComponent: CreateComponentReturnType<P> = (props): React.ReactElement<P> => {
    const theme: ThemePrepared = React.useContext(ThemeContext)

    return renderComponent(
      {
        className,
        defaultProps,
        displayName,
        handledProps: _.keys(propTypes).concat(handledProps),
        props,
        state: {},
        actionHandlers,
        focusZoneRef,
        render: config => render(config, props),
      },
      theme,
    )
  }

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
