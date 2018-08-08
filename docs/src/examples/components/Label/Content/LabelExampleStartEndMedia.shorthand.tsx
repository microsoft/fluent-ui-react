import React from 'react'
import { Label, Image, Icon } from '@stardust-ui/react'

const LabelExampleStartEndMediaShorthand = () => (
  <Label
    content="You have 23 emails"
    circular
    startMedia={
      <Image
        src="public/images/avatar/small/matt.jpg"
        avatar
        variables={{ avatarSize: '20px' }}
        style={{ verticalAlign: 'top' }}
      />
    }
    endMedia={<Icon name="close" />}
  />
)

export default LabelExampleStartEndMediaShorthand
