import * as React from 'react'
import * as _ from 'lodash'
import { Dropdown, Grid, Alignment, Position } from '@stardust-ui/react'
import { useSelectKnob, useBooleanKnob } from '@stardust-ui/docs-components'

const inputItems = ['Bruce Wayne', 'Natasha Romanoff', 'Steven Strange']

const DropdownExamplePosition = () => {
  const [open] = useBooleanKnob({ name: 'open', initialValue: true })

  const [positionAndAlign] = useSelectKnob<PositionAndAlign>({
    name: 'position-align',
    initialValue: 'below',
    values: positionAndAlignValues,
  })

  const [position, align] = _.split(positionAndAlign, '-') as [Position, Alignment]

  return (
    <Grid columns="1" variables={{ padding: '140px 0' }} styles={{ justifyItems: 'center' }}>
      <Dropdown
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

type PositionAndAlign =
  | 'above'
  | 'below'
  | 'before-top'
  | 'before-bottom'
  | 'after-top'
  | 'after-bottom'

const positionAndAlignValues: PositionAndAlign[] = [
  'above',
  'below',
  'before-top',
  'before-bottom',
  'after-top',
  'after-bottom',
]
