import * as _ from 'lodash'
import * as React from 'react'
import { createComponent, ComponentSlotStylesInput, ProviderConsumer } from '@stardust-ui/react'

import ColorBox from './ColorBox'

type ColorVariantsProps = {
  name: string
  headerOnly?: boolean
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
  render: ({ name, headerOnly, stardust: { classes } }) => (
    <ProviderConsumer
      render={({ siteVariables: { colors } }) => (
        <div className={classes.root}>
          <ColorBox
            name={name}
            size="big"
            value={colors[name][600] || colors[name][500]}
            copyToClipboardIcon={false}
          />

          {!headerOnly &&
            _.map(colors[name], (value, variable) => (
              <ColorBox key={variable} name={variable} size="small" value={value} />
            ))}
        </div>
      )}
    />
  ),
})

ColorVariants.defaultProps = {
  headerOnly: false,
}

export default ColorVariants
