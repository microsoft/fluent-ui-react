import React from 'react'
import { Icon } from '@stardust-ui/react'

const IconExampleDisabled = () => (
  <div>
    <Icon disabled name="umbrella" size="big" />
    <Icon disabled name="umbrella" size="big" variables={{ color: 'blue' }} />
    <Icon disabled name="umbrella" size="big" variables={{ color: 'red' }} />
    <Icon disabled name="umbrella" size="big" variables={{ color: 'orange' }} />
  </div>
)

export default IconExampleDisabled
