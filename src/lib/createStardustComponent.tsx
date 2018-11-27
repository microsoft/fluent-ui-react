import createComponentInternal from './createComponent'
import * as React from 'react'
import * as _ from 'lodash'
import { ComponentSlotClasses } from '../themes/types'

export interface RenderStardustResultConfig {
  classes: ComponentSlotClasses
  rtl: boolean
}

export interface CreateStardustComponentConfig<P> {
  displayName: string
  render: (props: P & { stardust: RenderStardustResultConfig }) => React.ReactNode
}

const createComponent = <P extends {} = {}, S extends {} = {}>({
  displayName,
  render,
}: CreateStardustComponentConfig<P>): React.SFC<P> => {
  return createComponentInternal<P, S>({
    displayName,
    render: (config, props) => {
      const filteredConfig = _.pick(config, ['classes', 'rtl'])
      return render(Object.assign({ stardust: filteredConfig }, props))
    },
  })
}

export default createComponent
