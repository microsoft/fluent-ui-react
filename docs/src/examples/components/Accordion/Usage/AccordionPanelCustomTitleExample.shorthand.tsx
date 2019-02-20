import * as React from 'react'
import { Accordion, Label, Layout } from '@stardust-ui/react'

class AccordionPanelCustomTitleExample extends React.Component {
  render() {
    const panels = [
      {
        title: {
          content: (
            <Layout
              start={
                <Label icon="warning circle" iconPosition="start" circular content="Warnings" />
              }
            />
          ),
        },
        content: {
          key: 'warnings',
          content: 'Here is a list of warnings discovered.',
        },
      },
      {
        title: {
          content: (
            <div>
              <strong>Someone</strong> has added <strong>Someone Else</strong> to the team
            </div>
          ),
          icon: { name: 'participant-add', variables: { outline: true } },
        },
        content: {
          key: 'peopleadded',
          content: (
            <div>
              <div style={{ padding: '0 0 .5em 0' }}>
                <strong>Someone</strong> has added <strong>Someone Else</strong> to the team
              </div>
              <div style={{ padding: '0 0 .5em 0' }}>
                <strong>Someone</strong> has added <strong>Someone Else</strong> to the team
              </div>
            </div>
          ),
        },
      },
    ]

    return <Accordion defaultActiveIndex={[0]} panels={panels} />
  }
}

export default AccordionPanelCustomTitleExample
