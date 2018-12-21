import * as React from 'react'
import { ItemLayout, Image } from '@stardust-ui/react'

const selection = knobs => (knobs === undefined ? true : knobs.selection)

const ItemLayoutExampleSelectionShorthand = ({ knobs }) => (
  <ItemLayout
    selection={selection(knobs)}
    media={<Image src="public/images/avatar/small/matt.jpg" avatar />}
    header="Irving Kuhic"
    headerMedia="7:26:56 AM"
    content="Program the sensor to the SAS alarm through the haptic SQL card!"
  />
)

export default ItemLayoutExampleSelectionShorthand
