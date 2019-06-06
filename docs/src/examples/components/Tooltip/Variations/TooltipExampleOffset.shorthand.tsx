import * as React from 'react'
import { Button, Grid, Tooltip } from '@stardust-ui/react'

const renderButton = rotateArrowUp => (
  <Button
    icon={{
      name: 'arrow circle up',
      styles: { transform: `rotate(${rotateArrowUp})` },
    }}
    styles={{ height: '80px', minWidth: '80px', padding: 0 }}
  />
)

const TooltipExamplePosition = () => (
  <Grid columns="1, 80px" variables={{ padding: '30px' }}>
    <Tooltip
      align="start"
      position="above"
      offset="-100%p"
      trigger={renderButton('-45deg')}
      content={{
        content: <p>The tooltip is rendered at above-start corner of the trigger.</p>,
      }}
      key="above-start"
    />
  </Grid>
)

export default TooltipExamplePosition
