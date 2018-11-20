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
  render: (props: P & { stardust: RenderStardustResultConfig }) => React.ReactNode
}

const createComponent = <P extends {} = {}, S extends {} = {}>({
  displayName = 'StardustComponent',
  render,
}: CreateStardustComponentConfig<P>): React.SFC<P> => {
  return createComponentInternal<P, S>({
    displayName,
    render: (config, props) => {
      const filteredConfig = pick(config, ['classes', 'rtl'])
      return render(Object.assign({ stardust: filteredConfig }, props))
    },
  })
}

export default createComponent
