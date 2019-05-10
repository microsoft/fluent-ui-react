import * as React from 'react'
import { Button, Grid, Popup, Alignment, Position } from '@stardust-ui/react'
import { useBooleanKnob, useSelectKnob } from '@stardust-ui/docs-components'

const PopupExamplePosition = () => {
  const [open] = useBooleanKnob({ name: 'open shorthand', initialValue: true })

  const [position] = useSelectKnob<Position>({
    name: 'position shorthand',
    initialValue: 'above',
    values: ['above', 'below', 'before', 'after'],
  })

  const [positionBeforeOrAfter, setPositionBeforeOrAfter] = React.useState<boolean>(
    isPositionBeforeOrAfter(position),
  )

  const [align] = useSelectKnob<Alignment>(
    positionBeforeOrAfter
      ? {
          name: 'h-align shorthand',
          initialValue: 'top',
          values: ['top', 'center', 'bottom'],
        }
      : {
          name: 'v-align shorthand',
          initialValue: 'start',
          values: ['start', 'center', 'end'],
        },
  )

  React.useEffect(() => setPositionBeforeOrAfter(isPositionBeforeOrAfter(position)), [position])

  const buttonStyles = { padding: paddings[position][align], height: '38px', minWidth: '64px' }

  return (
    <Grid columns="1" variables={{ padding: '100px 0' }} styles={{ justifyItems: 'center' }}>
      <Popup
        pointing
        open={open}
        align={align}
        position={position}
        trigger={<Button icon={icons[position]} styles={buttonStyles} />}
        content={{
          content: (
            <p>
              The popup is rendered {position} the trigger
              <br />
              aligned to the {align}.
            </p>
          ),
        }}
      />
    </Grid>
  )
}

export default PopupExamplePosition

const icons: { [key in Position]: string } = {
  above: 'arrow circle up',
  below: 'arrow circle down',
  before: 'arrow circle left',
  after: 'arrow circle right',
}

const paddings: { [key in Position]: { [key in Alignment]?: React.CSSProperties['padding'] } } = {
  above: {
    start: '5px 42px 18px 5px',
    center: '5px 5px 18px 5px',
    end: '5px 5px 18px 42px',
  },
  below: {
    start: '18px 42px 5px 5px',
    center: '18px 5px 5px 5px',
    end: '18px 5px 5px 42px',
  },
  before: {
    top: '5px 42px 18px 5px',
    center: '5px 42px 5px 5px',
    bottom: '18px 42px 5px 5px',
  },
  after: {
    top: '5px 5px 18px 42px',
    center: '5px 5px 5px 42px',
    bottom: '18px 5px 5px 42px',
  },
}

const isPositionBeforeOrAfter = (position: Position) =>
  position === 'before' || position === 'after'
