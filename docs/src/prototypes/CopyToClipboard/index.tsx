import * as React from 'react'
import { Flex, Text, Provider, themes } from '@stardust-ui/react/src'
import CopyToClipboard from './CopyToClipboard'

class CopyToClipboardPrototype extends React.Component {
  render() {
    return (
      <Provider theme={themes.teams} style={{ padding: 10 }}>
        <Flex gap="gap.medium" vAlign="center">
          <Text content="Commit: " />
          <Text content="3421f" color="brand" />
          <CopyToClipboard timeout={3000} value="lorem ipsum" />
        </Flex>
      </Provider>
    )
  }
}

export default CopyToClipboardPrototype
