import React from 'react'
import { Grid, Input, Text } from '@stardust-ui/react'

const InputExampleWrapperSlot = () => (
  <Grid columns="1fr 2fr" styles={{ justifyItems: 'start', alignItems: 'center', gap: '10px' }}>
    <Text content="Input default:" />
    <Input
      placeholder="Search..."
      dir="ltr"
      tabIndex={2}
      styles={{ color: 'blue', backgroundColor: 'yellow' }}
    />

    <Text content="Wrapped Input with props:" />
    <Input
      placeholder="Search..."
      dir="ltr"
      tabIndex={2}
      styles={{ color: 'blue', backgroundColor: 'yellow' }}
      wrapper={{
        // override component's 'dir' attribute
        dir: 'rtl',

        // override component's 'tabIndex' attribute
        tabIndex: 0,

        // set custom styles for wrapper element
        styles: { padding: '5px', backgroundColor: 'red' },
      }}
    />

    <Text content="Wrapped Input with existing component:" />
    <Input
      placeholder="Search..."
      dir="ltr"
      tabIndex={2}
      styles={{ color: 'blue', backgroundColor: 'yellow' }}
      wrapper={<Text dir="rtl" tabIndex={0} styles={{ padding: '5px', backgroundColor: 'red' }} />}
    />

    <Text content="Wrapped Input with custom element:" />
    <Input
      placeholder="Search..."
      dir="ltr"
      tabIndex={2}
      styles={{ color: 'blue', backgroundColor: 'yellow' }}
      wrapper={<span dir="rtl" tabIndex={0} style={{ padding: '5px', backgroundColor: 'red' }} />}
    />
  </Grid>
)

export default InputExampleWrapperSlot
