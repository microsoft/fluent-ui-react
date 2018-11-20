import createComponentInternal from './createComponent'
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

const createComponent = <P extends {} = {}, S extends {} = {}>({
  displayName = 'StardustComponent',
  render,
}: CreateStardustComponentConfig<P>): React.SFC<P> => {
  return createComponentInternal({
    displayName,
    render(config, props) {
      // TODO add here everything that the client may expect
      const filteredConfig = _.pick(config, ['classes', 'variables', 'styles', 'rtl', 'theme'])

      return render(filteredConfig, props)
    },
  })
}

export default createComponent
