import createComponentInternal from './createComponent'
import * as React from 'react'
import * as _ from 'lodash'
import { ComponentSlotClasses, ComponentSlotStylesPrepared } from '../themes/types'
import { AccessibilityBehavior, AccessibilityActionHandlers } from './accessibility/types'

export interface RenderStardustResultConfig {
  accessibility: AccessibilityBehavior
  classes: ComponentSlotClasses
  rtl: boolean
  styles: ComponentSlotStylesPrepared
}

export interface CreateStardustComponentConfig<P> {
  displayName: string
  render: (props: P & { stardust: RenderStardustResultConfig }) => React.ReactNode
  defaultProps?: any
  actionHandlers?: AccessibilityActionHandlers
}

const createComponent = <P extends {} = {}, S extends {} = {}>({
  displayName,
  render,
  defaultProps,
  actionHandlers,
}: CreateStardustComponentConfig<P>): React.SFC<P> => {
  return createComponentInternal<P, S>({
    displayName,
    render: (config, props) => {
      const filteredConfig = _.pick(config, ['accessibility', 'classes', 'rtl', 'styles'])
      return render(Object.assign({ stardust: filteredConfig }, props))
    },
    defaultProps,
    actionHandlers,
  })
}

export default createComponent
