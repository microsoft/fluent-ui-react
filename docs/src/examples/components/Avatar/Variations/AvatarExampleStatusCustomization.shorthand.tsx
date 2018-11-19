import React from 'react'
import { Avatar, Grid, Text } from '@stardust-ui/react'

const defaultAvatar = (
  <Avatar
    image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
    status={{
      color: 'green',
      icon: 'check',
      title: 'Available',
    }}
  />
)

const AvatarExampleStatusCustomizationShorthand = () => (
  <Grid
    columns="50% 50px 50px"
    styles={{ justifyContent: 'start', justifyItems: 'start', gap: '10px', alignItems: 'center' }}
  >
    <Text content="Status can receive variables" />
    {defaultAvatar}
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
      status={{
        color: 'green',
        icon: 'check',
        title: 'Available',
      }}
      variables={{ statusBorderColor: 'orange' }}
    />
    <Text content="Status can have different size for the same avatar size" />
    {defaultAvatar}
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
      status={{
        color: 'green',
        icon: 'check',
        title: 'Available',
        size: 16,
      }}
    />
    <Text content="Status can have same size for different avatar sizes" />
    {defaultAvatar}
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
      size={48}
      status={{
        color: 'green',
        icon: 'check',
        title: 'Available',
      }}
    />
    <Text content="Status and avatar sizes can be proportionate" />
    {defaultAvatar}
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
      size={48}
      status={{
        color: 'green',
        icon: 'check',
        title: 'Available',
        size: 48,
      }}
    />
  </Grid>
)

export default AvatarExampleStatusCustomizationShorthand
