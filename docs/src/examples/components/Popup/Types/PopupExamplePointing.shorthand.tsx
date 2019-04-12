import * as React from 'react'
import { Button, Grid, Popup } from '@stardust-ui/react'

const PopupWithButton = props => (
  <Popup
    align={props.align}
    content={{
      content: (
        <>
          <p>A popup with a pointer.</p>
          <p>
            Is aligned to <code>{props.align}</code>.
          </p>
        </>
      ),
    }}
    pointing
    position={props.position}
    trigger={
      <Button
        icon={props.icon}
        styles={{ padding: props.padding, height: '38px', minWidth: '64px' }}
      />
    }
  />
)

const triggers = [
  { position: 'above', align: 'start', icon: 'arrow circle up', padding: '5px 42px 18px 5px' },
  { position: 'above', align: 'center', icon: 'arrow circle up', padding: '5px 5px 18px 5px' },
  { position: 'above', align: 'end', icon: 'arrow circle up', padding: '5px 5px 18px 42px' },
  { position: 'below', align: 'start', icon: 'arrow circle down', padding: '18px 42px 5px 5px' },
  { position: 'below', align: 'center', icon: 'arrow circle down', padding: '18px 5px 5px 5px' },
  { position: 'below', align: 'end', icon: 'arrow circle down', padding: '18px 5px 5px 42px' },
  { position: 'before', align: 'top', icon: 'arrow circle left', padding: '5px 42px 18px 5px' },
  { position: 'before', align: 'center', icon: 'arrow circle left', padding: '5px 42px 5px 5px' },
  { position: 'before', align: 'bottom', icon: 'arrow circle left', padding: '18px 42px 5px 5px' },
  { position: 'after', align: 'top', icon: 'arrow circle right', padding: '5px 5px 18px 42px' },
  { position: 'after', align: 'center', icon: 'arrow circle right', padding: '5px 5px 5px 42px' },
  { position: 'after', align: 'bottom', icon: 'arrow circle right', padding: '18px 5px 5px 42px' },
]

const PopupExamplePointing = () => (
  <Grid columns="repeat(3, 30px)" variables={{ padding: '30px', gridGap: '80px' }}>
    {triggers.map(({ position, align, icon, padding }) => (
      <PopupWithButton
        align={align}
        icon={icon}
        key={`${position}-${align}`}
        padding={padding}
        position={position}
      />
    ))}
  </Grid>
)

export default PopupExamplePointing
