import * as React from 'react'
import { Accordion, Label, Layout } from '@stardust-ui/react'

const AccordionPanelCustomTitleExample = () => {
  const panels = [
    {
      title: (
        <Layout
          key="title"
          start={<Label icon="warning circle" iconPosition="start" circular content="Warnings" />}
        />
      ),
      content: {
        key: 'warnings',
        content: 'Here is a list of warnings discovered.',
      },
    },
  ]

  return <Accordion defaultActiveIndex={[0]} panels={panels} />
}

export default AccordionPanelCustomTitleExample
