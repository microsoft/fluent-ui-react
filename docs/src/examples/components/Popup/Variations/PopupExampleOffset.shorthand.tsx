import React from 'react'
import { Button, Grid, Popup, Alignment, Position } from '@stardust-ui/react'

const renderButton = rotateArrowUp => (
  <Button
    icon={{
      name: 'arrow circle up',
      styles: { transform: `rotate(${rotateArrowUp})` },
    }}
    styles={{ height: '80px', minWidth: '80px', padding: 0 }}
  />
)

const triggers = [
  { position: 'above', align: 'start', offset: '-100%p', rotateArrowUp: '-45deg' },
  { position: 'above', align: 'end', offset: '100%p', rotateArrowUp: '45deg' },
  { position: 'below', align: 'start', offset: '-100%p', rotateArrowUp: '-135deg' },
  { position: 'below', align: 'end', offset: '100%p', rotateArrowUp: '135deg' },
]

const PopupExamplePosition = () => (
  <Grid columns="repeat(2, 80px)" variables={{ padding: '30px', gridGap: '30px' }}>
    {triggers.map(({ position, align, offset, rotateArrowUp }) => (
      <Popup
        align={align as Alignment}
        position={position as Position}
        offset={offset}
        trigger={renderButton(rotateArrowUp)}
        content={{
          content: (
            <p>
              The popup is rendered at {position}-{align}
              <br />
              corner of the trigger.
            </p>
          ),
        }}
        key={`${position}-${align}`}
      />
    ))}
  </Grid>
)

export default PopupExamplePosition
