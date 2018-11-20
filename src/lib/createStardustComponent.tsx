import createComponentInternal from './createComponent'
import * as React from 'react'
import { pick } from 'lodash'
import { ComponentSlotClasses } from '@stardust-ui/react'

export interface RenderStardustResultConfig {
  classes: ComponentSlotClasses
  rtl: boolean
}

export interface CreateStardustComponentConfig<P> {
  displayName?: string
  render: (config: RenderStardustResultConfig, props: P) => React.ReactNode
}

const createComponent = <P extends {} = {}, S extends {} = {}>({
  displayName = 'StardustComponent',
  render,
}: CreateStardustComponentConfig<P>): React.SFC<P> => {
  return createComponentInternal({
    displayName,
    render(config, props) {
      const filteredConfig = pick(config, ['classes', 'rtl'])
      return render(filteredConfig, props)
    },
  })
}

export default createComponent
