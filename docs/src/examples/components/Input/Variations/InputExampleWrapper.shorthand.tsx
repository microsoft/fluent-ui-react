import React from 'react'
import { Grid, Input, Text } from '@stardust-ui/react'

const wrapperStyles = { padding: '5px', background: 'red' }
const InputExampleWrapper = () => (
  <Grid columns="1fr 2fr" styles={{ justifyItems: 'start', alignItems: 'center', gap: '10px' }}>
    <Text content="Input:" />
    <Input placeholder="Search..." wrapped={false} />

    <Text content="Wrapped Input default:" />
    <Input placeholder="Search..." />

    <Text content="Wrapped Input with props:" />
    <Input placeholder="Search..." wrapper={{ role: 'presentation', styles: wrapperStyles }} />

    <Text content="Wrapped Input with existing component:" />
    <Input placeholder="Search..." wrapper={<Text role="presentation" styles={wrapperStyles} />} />

    <Text content="Wrapped Input with custom element:" />
    <Input placeholder="Search..." wrapper={<span role="presentation" style={wrapperStyles} />} />
  </Grid>
)

export default InputExampleWrapper
