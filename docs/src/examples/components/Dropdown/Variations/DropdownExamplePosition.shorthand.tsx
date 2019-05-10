import * as React from 'react'
import { Dropdown, Grid, Alignment, Position } from '@stardust-ui/react'
import { useSelectKnob, useBooleanKnob } from '@stardust-ui/docs-components'

const inputItems = ['Bruce Wayne', 'Natasha Romanoff', 'Steven Strange']

const DropdownExamplePosition = () => {
  const [open] = useBooleanKnob({ name: 'dropdown open', initialValue: true })

  const [position] = useSelectKnob<Position>({
    name: 'position',
    initialValue: 'below',
    values: ['above', 'below', 'before', 'after'],
  })

  const [positionBeforeOrAfter, setPositionBeforeOrAfter] = React.useState<boolean>(
    isPositionBeforeOrAfter(position),
  )

  const [align] = useSelectKnob<Alignment>({
    name: 'align N.A.',
    ...(positionBeforeOrAfter && {
      name: 'align',
      initialValue: 'top',
      values: ['top', 'bottom'],
    }),
  })

  React.useEffect(() => setPositionBeforeOrAfter(isPositionBeforeOrAfter(position)), [position])

  return (
    <Grid columns="1" variables={{ padding: '140px 0' }} styles={{ justifyItems: 'center' }}>
      <Dropdown
        inline
        open={open}
        items={inputItems}
        placeholder={`Opens ${position} trigger${align ? ` aligned to ${align}` : ''}.`}
        align={align}
        position={position}
      />
    </Grid>
  )
}

export default DropdownExamplePosition

const isPositionBeforeOrAfter = (position: Position) =>
  position === 'before' || position === 'after'
