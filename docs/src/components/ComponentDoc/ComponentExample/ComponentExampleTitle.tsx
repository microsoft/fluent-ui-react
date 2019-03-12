import * as React from 'react'
import { Flex, Header, Text } from '@stardust-ui/react'

const titleStyle = {
  margin: 0,
}

interface ComponentExampleTitleProps {
  description?: React.ReactNode
  title: React.ReactNode
}

export default class ComponentExampleTitle extends React.PureComponent<ComponentExampleTitleProps> {
  render() {
    const { description, title } = this.props
    return (
      <Flex column>
        {title && <Header as="h3" className="no-anchor" content={title} styles={titleStyle} />}
        <Text content={description} />
      </Flex>
    )
  }
}
