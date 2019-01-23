import * as React from 'react'
import { Avatar } from '@stardust-ui/react'

const status = { color: 'green', icon: 'check', title: 'Available' }

const AvatarExampleExcludedInitialsShorthand = () => (
  <div>
    <Avatar name="John Doe (Software Developer)" status={status} />
    &emsp;
    <Avatar name="John Doe {Software Developer}" status={status} />
    &emsp;
    <Avatar name="John Doe [Software Developer]" status={status} />
    &emsp;
    <Avatar name="John A B Doe" status={status} />
  </div>
)

export default AvatarExampleExcludedInitialsShorthand
