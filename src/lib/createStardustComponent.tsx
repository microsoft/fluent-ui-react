import createComponentInternal from './createComponent'
import * as React from 'react'
import * as _ from 'lodash'
import { CreateStardustComponentConfig } from '../../types/utils'

const createComponent = <P extends {} = {}, S extends {} = {}>({
  displayName = 'StardustComponent',
  render,
}: CreateStardustComponentConfig<P>): React.SFC<P> => {
  return createComponentInternal({
    displayName,
    render(config, props) {
      const filteredConfig = _.pick(config, ['classes', 'rtl'])
      return render(filteredConfig, props)
    },
  })
}

export default createComponent
