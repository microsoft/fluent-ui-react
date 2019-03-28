import * as React from 'react'
import { Layout, Text, Header } from '@stardust-ui/react'

const longString = 'End content. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

const LayoutExampleCustom = props => (
  <Layout
    debug
    vertical
    // start="Start content."
    // main="Main content."
    start={props.end}
    main={props.end}
    end={props.end}
    styles={{ width: '200px' }}
  />
)

const LayoutExampleVertical = () => (
  <div style={{ margin: 20 }}>
    <Header as="h3">String</Header>
    <LayoutExampleCustom end={longString} />
    <Header as="h3">Text component</Header>
    <LayoutExampleCustom end={<Text content={longString} />} />
    <Header as="h3">Truncated text component</Header>
    <LayoutExampleCustom end={<Text truncated content={longString} />} />
  </div>
)

export default LayoutExampleVertical
