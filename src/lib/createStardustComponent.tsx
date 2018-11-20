import createComponent from './createComponent'
import * as React from 'react'
import * as _ from 'lodash'
import {
  ComponentSlotClasses,
  ThemePrepared,
  ComponentSlotStylesPrepared,
  ComponentVariablesObject,
} from '../themes/types'

export interface RenderStardustResultConfig {
  classes: ComponentSlotClasses
  variables: ComponentVariablesObject
  styles: ComponentSlotStylesPrepared
  rtl: boolean
  theme: ThemePrepared
}

export type RenderStardustComponentCallback<P> = (
  config: RenderStardustResultConfig,
  props: P,
) => any

export interface CreateStardustComponentConfig<P> {
  displayName?: string
  render: RenderStardustComponentCallback<P>
}

const createStardustComponent = <P extends {} = {}, S extends {} = {}>({
  displayName = 'StardustComponent',
  render,
}: CreateStardustComponentConfig<P>): React.SFC<P> => {
  const StardustComponent: React.SFC<P> = createComponent({
    displayName,
    render(config, props) {
      // TODO add here everything that the client may expect
      const restrictedConfig = _.pick(config, ['classes', 'variables', 'styles', 'rtl', 'theme'])

      return render(restrictedConfig, props)
    },
  })
  StardustComponent.displayName = displayName
  return StardustComponent
}

export default createStardustComponent
