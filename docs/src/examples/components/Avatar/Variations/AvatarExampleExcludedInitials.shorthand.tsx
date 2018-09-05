import React from 'react'
import { Avatar } from '@stardust-ui/react'

const Available = {
  icon: { name: 'check', variables: { color: 'white', backgroundColor: 'green' } },
  title: 'Available',
}

const AvatarExampleExcludedInitialsShorthand = () => (
  <div>
    <Avatar name="John Doe (Software Developer)" status={Available} />
    &emsp;
    <Avatar name="John Doe {Software Developer}" status={Available} />
    &emsp;
    <Avatar name="John Doe [Software Developer]" status={Available} />
    &emsp;
    <Avatar name="John A B Doe" status={Available} />
  </div>
)

export default AvatarExampleExcludedInitialsShorthand
