import React from 'react'
import { Grid, Input, Text } from '@stardust-ui/react'

const inputProps = { placeholder: 'Search...', role: 'presentation' }
const inputStyles = { color: 'blue', background: 'yellow' }
const inputOverrides = { placeholder: 'Placeholder Override...', role: 'checkbox' }

const InputExampleInputSlot = () => (
  <Grid columns="1fr 2fr" styles={{ justifyItems: 'start', alignItems: 'center', gap: '10px' }}>
    <Text content="Input default:" />
    <Input {...inputProps} />

    <Text content="Input with input slot as props:" />
    <Input {...inputProps} input={{ ...inputOverrides, styles: inputStyles }} />

    <Text content="Wrapped Input with existing component:" />
    <Input {...inputProps} input={<Text as="input" {...inputOverrides} styles={inputStyles} />} />

    <Text content="Wrapped Input with custom element:" />
    <Input {...inputProps} input={<input {...inputOverrides} style={inputStyles} />} />
  </Grid>
)

export default InputExampleInputSlot
