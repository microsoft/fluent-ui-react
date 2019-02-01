import * as React from 'react'
import { Avatar, Grid } from '@stardust-ui/react'

const statusProps = {
  icon: 'check',
  color: 'green',
  title: 'Available',
}

const AvatarExampleSizeShorthand = () => (
  <Grid columns="80px 1fr">
    {(['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest'] as any[]).map(
      size => {
        return (
          <>
            <strong>{size}</strong>
            <div>
              <Avatar
                size={size}
                image="public/images/avatar/small/matt.jpg"
                status={statusProps}
              />
              &emsp;
              <Avatar size={size} name="John Doe" status={statusProps} />
              &emsp;
              <Avatar size={size} image="public/images/avatar/small/matt.jpg" />
            </div>
          </>
        )
      },
    )}
  </Grid>
)

export default AvatarExampleSizeShorthand
