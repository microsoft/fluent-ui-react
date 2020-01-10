import * as React from 'react'
import { Avatar, Grid, Text } from '@fluentui/react'

const defaultAvatar = (
  <Avatar
    image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
    status={{
      color: 'green',
      icon: 'icon-checkmark',
      title: 'Available',
    }}
  />
)

const AvatarExampleStatusCustomizationShorthand = () => (
  <Grid
    columns="50% 50px 50px"
    styles={{ justifyContent: 'start', justifyItems: 'start', gap: '10px', alignItems: 'center' }}
  >
    <Text content="Status can receive variables." />
    {defaultAvatar}
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
      status={{
        color: 'green',
        icon: 'icon-checkmark',
        title: 'Available',
      }}
      variables={{ statusBorderColor: 'orange' }}
    />
    <Text content="Avatar and its status are proportionate (share the same size value) by default." />
    {defaultAvatar}
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
      size="larger"
      status={{
        color: 'green',
        icon: 'icon-checkmark',
        title: 'Available',
      }}
    />
    <Text content="Status can have different size for the same avatar size." />
    {defaultAvatar}
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
      status={{
        color: 'green',
        icon: 'icon-checkmark',
        title: 'Available',
        size: 'larger',
      }}
    />
    <Text content="Status can have same size for different avatar sizes." />
    {defaultAvatar}
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
      size="larger"
      status={{
        color: 'green',
        icon: 'icon-checkmark',
        title: 'Available',
        size: 'medium',
      }}
    />
  </Grid>
)

export default AvatarExampleStatusCustomizationShorthand
