import * as React from 'react'
import { Flex, Text } from '@stardust-ui/react/src'
import CopyToClipboard from './CopyToClipboard'

class CopyToClipboardPrototype extends React.Component {
  render() {
    return (
      <div style={{ padding: 10 }}>
        <Flex gap="gap.medium" vAlign="center">
          <Text content="Commit: " />
          <Text content="3421f" color="brand" />
          <CopyToClipboard />
        </Flex>
      </div>
    )
  }
}

export default CopyToClipboardPrototype
