import * as React from 'react'
import { Accordion, Button, Flex } from '@stardust-ui/react'

class AccordionPanelCustomContentExample extends React.Component {
  render() {
    const panels = [
      {
        title: 'Pets',
        content: {
          key: 'animals',
          content: (
            <Flex gap="gap.smaller">
              <Button primary>Add pet</Button>
              <Button>Remove pet</Button>
            </Flex>
          ),
        },
      },
    ]

    return <Accordion defaultActiveIndex={[0]} panels={panels} />
  }
}

export default AccordionPanelCustomContentExample
