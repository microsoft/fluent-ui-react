import React from 'react'
import { Grid, Input, Text } from '@stardust-ui/react'

const inputProps = {
  placeholder: 'Search...',
  dir: 'ltr',
  tabIndex: 2,
  styles: { color: 'blue', backgroundColor: 'yellow' },
}
const wrapperStyles = { padding: '5px', backgroundColor: 'red' }
const wrapperOverrides = { dir: 'rtl', tabIndex: 0 }

const InputExampleWrapperSlot = () => (
  <Grid columns="1fr 2fr" styles={{ justifyItems: 'start', alignItems: 'center', gap: '10px' }}>
    <Text content="Input default:" />
    <Input {...inputProps} />

    <Text content="Wrapped Input with props:" />
    <Input {...inputProps} wrapper={{ as: 'p', ...wrapperOverrides, styles: wrapperStyles }} />

    <Text content="Wrapped Input with existing component:" />
    <Input {...inputProps} wrapper={<Text {...wrapperOverrides} styles={wrapperStyles} />} />

    <Text content="Wrapped Input with custom element:" />
    <Input {...inputProps} wrapper={<span {...wrapperOverrides} style={wrapperStyles} />} />
  </Grid>
)

export default InputExampleWrapperSlot
