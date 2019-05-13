import * as React from 'react'
import * as _ from 'lodash'
import { Button, Grid, Popup, Alignment, Position } from '@stardust-ui/react'
import { useBooleanKnob, useSelectKnob } from '@stardust-ui/docs-components'

const PopupExamplePosition = () => {
  const [open] = useBooleanKnob({ name: 'open', initialValue: true })

  const [positionAndAlign] = useSelectKnob<PositionAndAlign>({
    name: 'position-align',
    initialValue: 'above-start',
    values: positionAndAlignValues,
  })

  const [position, align] = _.split(positionAndAlign, '-') as [Position, Alignment]
  const buttonStyles = { padding: paddings[positionAndAlign], height: '38px', minWidth: '64px' }

  return (
    <Grid columns="1" variables={{ padding: '100px 0' }} styles={{ justifyItems: 'center' }}>
      <Popup
        open={open || undefined}
        align={align}
        position={position}
        content={{
          content: (
            <p>
              The popup is rendered {position} the trigger
              <br />
              aligned to the {align}.
            </p>
          ),
        }}
      >
        <Button icon={icons[position]} styles={buttonStyles} />
      </Popup>
    </Grid>
  )
}

export default PopupExamplePosition

type PositionAndAlign =
  | 'above-start'
  | 'above-center'
  | 'above-end'
  | 'below-start'
  | 'below-center'
  | 'below-end'
  | 'before-top'
  | 'before-center'
  | 'before-bottom'
  | 'after-top'
  | 'after-center'
  | 'after-bottom'

const positionAndAlignValues: PositionAndAlign[] = [
  'above-start',
  'above-center',
  'above-end',
  'below-start',
  'below-center',
  'below-end',
  'before-top',
  'before-center',
  'before-bottom',
  'after-top',
  'after-center',
  'after-bottom',
]

const icons: { [key in Position]: string } = {
  above: 'arrow circle up',
  below: 'arrow circle down',
  before: 'arrow circle left',
  after: 'arrow circle right',
}

const paddings: Record<PositionAndAlign, React.CSSProperties['padding']> = {
  'above-start': '5px 42px 18px 5px',
  'above-center': '5px 5px 18px 5px',
  'above-end': '5px 5px 18px 42px',
  'below-start': '18px 42px 5px 5px',
  'below-center': '18px 5px 5px 5px',
  'below-end': '18px 5px 5px 42px',
  'before-top': '5px 42px 18px 5px',
  'before-center': '5px 42px 5px 5px',
  'before-bottom': '18px 42px 5px 5px',
  'after-top': '5px 5px 18px 42px',
  'after-center': '5px 5px 5px 42px',
  'after-bottom': '18px 5px 5px 42px',
}
