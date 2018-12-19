import * as React from 'react'
import { ItemLayout, Image } from '@stardust-ui/react'

const ellipsis = <span>&hellip;</span>

const ItemLayoutExampleShorthand = ({ knobs }) => (
  <ItemLayout
    media={<Image src="public/images/avatar/small/matt.jpg" avatar />}
    header="Irving Kuhic"
    headerMedia="7:26:56 AM"
    content="Program the sensor to the SAS alarm through the haptic SQL card!"
    contentMedia="!!"
    endMedia={ellipsis}
    debug={knobs.debug}
  />
)

export default ItemLayoutExampleShorthand
