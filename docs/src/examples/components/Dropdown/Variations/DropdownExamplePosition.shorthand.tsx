import * as React from 'react'
import { Grid, Dropdown } from '@stardust-ui/react'

const inputItems = ['Bruce Wayne', 'Natasha Romanoff', 'Steven Strange', 'Alfred Pennyworth']

const DropdownArrowExample = props => {
  const { position, align } = props

  return (
    <Dropdown
      items={inputItems}
      placeholder={`${position} the trigger aligned to the ${align}.`}
      align={align}
      position={position}
    />
  )
}

const triggers = [
  { position: 'above', align: 'start' },
  { position: 'above', align: 'end' },
  { position: 'below', align: 'start' },
  { position: 'below', align: 'end' },
  { position: 'before', align: 'top' },
  { position: 'before', align: 'bottom' },
  { position: 'after', align: 'top' },
  { position: 'after', align: 'bottom' },
]

const DropdownExamplePosition = () => (
  <Grid columns="repeat(2, 1fr)" variables={{ padding: '100px', gridGap: '100px' }}>
    {triggers.map(({ position, align }) => (
      <DropdownArrowExample position={position} align={align} key={`${position}-${align}`} />
    ))}
  </Grid>
)

export default DropdownExamplePosition
