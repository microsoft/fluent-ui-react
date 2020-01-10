import { ReactAccessibilityBehavior, AccessibilityActionHandlers } from '@fluentui/react-bindings'
import * as React from 'react'
import * as _ from 'lodash'

import createComponentInternal, { CreateComponentReturnType } from './createComponentInternal'
import { ComponentSlotClasses, ComponentSlotStylesPrepared } from '../themes/types'
import { ObjectOf } from '../types'

export interface CreateComponentRenderConfig {
  accessibility: ReactAccessibilityBehavior
  classes: ComponentSlotClasses
  rtl: boolean
  styles: ComponentSlotStylesPrepared
}

export interface CreateComponentConfig<P> {
  displayName: string
  className?: string
  render: (props: P & { config: CreateComponentRenderConfig }) => React.ReactNode
  defaultProps?: any
  actionHandlers?: AccessibilityActionHandlers
}

const createComponent = <P extends ObjectOf<any> = any>({
  displayName,
  className,
  render,
  defaultProps,
  actionHandlers,
}: CreateComponentConfig<P>): CreateComponentReturnType<P> => {
  return createComponentInternal<P>({
    displayName,
    className,
    render: (config, props) => {
      const filteredConfig = _.pick(config, ['accessibility', 'classes', 'rtl', 'styles'])
      return render(Object.assign({ config: filteredConfig }, props))
    },
    defaultProps,
    actionHandlers,
  })
}

export default createComponent
