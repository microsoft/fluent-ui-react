import React from 'react'
import { Grid, Input, Text } from '@stardust-ui/react'

const inputStyles = { color: 'blue', background: 'yellow' }
const wrapperStyles = { padding: '5px', background: 'red' }
const partitionedProps = {
  placeholder: 'Search...',
  dir: 'ltr',
  tabIndex: 2,
  disabled: false,
  role: 'presentation',
  styles: { padding: '5px', background: 'green' },
}

const InputExampleTargeting = () => (
  <Grid columns="1fr 2fr" styles={{ justifyItems: 'start', alignItems: 'center', gap: '10px' }}>
    <Text content="Default Input:" />
    <Input placeholder="Search..." />

    <Text content="Default Input with partitioned props:" />
    <Input {...partitionedProps} />

    <Text content="Default Input with partitioned props and input slot targeting:" />
    <Input {...partitionedProps} input={{ dir: 'rtl', tabIndex: 0, styles: inputStyles }} />

    <Text content="Default Input with partitioned props and wrapper slot targeting:" />
    <Input
      {...partitionedProps}
      wrapper={{ disabled: true, role: 'checkbox', styles: wrapperStyles }}
    />

    <Text content="Default Input with partitioned props and input and wrapper slot targeting:" />
    <Input
      {...partitionedProps}
      input={{ dir: 'rtl', tabIndex: 0, styles: inputStyles }}
      wrapper={{ disabled: true, role: 'checkbox', styles: wrapperStyles }}
    />
  </Grid>
)

export default InputExampleTargeting
