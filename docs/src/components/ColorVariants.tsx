import * as _ from 'lodash'
import * as React from 'react'
import { createComponent, ComponentSlotStylesInput } from '@stardust-ui/react'

import ProviderConsumer from 'src/components/Provider/ProviderConsumer'
import ColorBox from './ColorBox'

type ColorVariantsProps = {
  name: string
}

export const colorVariantsStyles: ComponentSlotStylesInput<ColorVariantsProps> = {
  root: {
    border: '1px solid transparent',
    borderRadius: '.25rem',
    overflow: 'hidden',
  },
}

const ColorVariants = createComponent<ColorVariantsProps>({
  displayName: 'ColorVariants',
  render: ({ name, stardust: { classes } }) => (
    <ProviderConsumer
      render={({ siteVariables: { colors } }) => (
        <div className={classes.root}>
          <ColorBox name={name} size="big" value={colors[name][500]} />

          {_.map(colors[name], (value, variable) => (
            <ColorBox key={variable} name={variable} size="small" value={value} />
          ))}
        </div>
      )}
    />
  ),
})

export default ColorVariants
