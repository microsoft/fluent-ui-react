import React from 'react'
import { ItemLayout, Image } from '@stardust-ui/react'

const ItemLayoutExampleShorthand = ({ knobs }) => (
  <ItemLayout
    media={<Image src="public/images/avatar/small/matt.jpg" avatar />}
    header="Irving Kuhic"
    headerMedia="7:26:56 AM"
    content="Program the sensor to the SAS alarm through the haptic SQL card!"
    debug={knobs.debug}
  />
)

export default ItemLayoutExampleShorthand
