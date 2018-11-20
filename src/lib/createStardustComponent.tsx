import createComponentInternal from './createComponent'
import * as React from 'react'
import * as _ from 'lodash'
import { ComponentSlotClasses } from '../themes/types'

export interface RenderStardustResultConfig {
  classes: ComponentSlotClasses
  rtl: boolean
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
      const filteredConfig = _.pick(config, ['classes', 'rtl'])

      return render(filteredConfig, props)
    },
  })
}

export default createComponent
