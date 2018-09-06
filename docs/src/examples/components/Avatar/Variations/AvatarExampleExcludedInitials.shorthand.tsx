import React from 'react'
import { Avatar } from '@stardust-ui/react'

const availableStatus = {
  icon: { name: 'check', variables: { color: 'white', backgroundColor: 'green' } },
  title: 'Available',
}

const AvatarExampleExcludedInitialsShorthand = () => (
  <div>
    <Avatar name="John Doe (Software Developer)" status={availableStatus} />
    &emsp;
    <Avatar name="John Doe {Software Developer}" status={availableStatus} />
    &emsp;
    <Avatar name="John Doe [Software Developer]" status={availableStatus} />
    &emsp;
    <Avatar name="John A B Doe" status={availableStatus} />
  </div>
)

export default AvatarExampleExcludedInitialsShorthand
