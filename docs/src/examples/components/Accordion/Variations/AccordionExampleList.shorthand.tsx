import * as React from 'react'
import { Accordion, Button } from '@stardust-ui/react'

class AccordionExampleList extends React.Component {
  render() {
    const panels = [
      {
        title: 'Pets',
        content: {
          key: 'animals',
          content: (
            <div>
              <Button primary>Add pet</Button>
              <Button>Remove pet</Button>
            </div>
          ),
        },
      },
    ]

    return <Accordion defaultActiveIndex={[0]} panels={panels} />
  }
}

export default AccordionExampleList
