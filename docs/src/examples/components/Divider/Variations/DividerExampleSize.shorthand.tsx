import _ from 'lodash'
import React from 'react'
import { Divider } from '@stardust-ui/react'

const DividerExampleSizeShorthand = () =>
  _.times(11, i => {
    const size = i

    return <Divider key={size} size={size} content={`Size ${size}`} />
  })

export default DividerExampleSizeShorthand
