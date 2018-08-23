import React from 'react'
import { Icon } from '@stardust-ui/react'

const IconExampleDisabled = () => (
  <div>
    <Icon disabled svg name="umbrella" size="big" />
    <Icon disabled svg name="umbrella" size="big" variables={{ color: 'blue' }} />
    <Icon disabled svg name="umbrella" size="big" variables={{ color: 'red' }} />
    <Icon disabled svg name="umbrella" size="big" variables={{ color: 'orange' }} />
  </div>
)

export default IconExampleDisabled
