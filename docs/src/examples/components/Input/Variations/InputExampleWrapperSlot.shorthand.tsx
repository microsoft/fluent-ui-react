import React from 'react'
import { Grid, Input, Text } from '@stardust-ui/react'

const InputExampleWrapperSlot = () => (
  <Grid columns="1fr 2fr" css={{ justifyItems: 'start', alignItems: 'center', gap: '10px' }}>
    <Text content="Input default:" />
    <Input
      placeholder="Search..."
      tabIndex={-1}
      css={{ color: 'blue', backgroundColor: 'yellow' }}
    />

    <Text content="Wrapped Input with props:" />
    <Input
      placeholder="Search..."
      tabIndex={-1}
      css={{ color: 'blue', backgroundColor: 'yellow' }}
      wrapper={{
        // will override component's 'tabIndex' attribute
        tabIndex: 0,

        // will set custom styles for wrapper element
        css: { padding: '5px', backgroundColor: 'red' },
      }}
    />

    <Text content="Wrapped Input with existing component:" />
    <Input
      placeholder="Search..."
      tabIndex={-1}
      css={{ color: 'blue', backgroundColor: 'yellow' }}
      wrapper={<Text tabIndex={0} css={{ padding: '5px', backgroundColor: 'red' }} />}
    />

    <Text content="Wrapped Input with custom element:" />
    <Input
      placeholder="Search..."
      tabIndex={-1}
      css={{ color: 'blue', backgroundColor: 'yellow' }}
      wrapper={<span tabIndex={0} style={{ padding: '5px', backgroundColor: 'red' }} />}
    />
  </Grid>
)

export default InputExampleWrapperSlot
