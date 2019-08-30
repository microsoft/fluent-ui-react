import * as React from 'react'
import { Flex, Text, Provider, themes } from '@stardust-ui/react/src'
import CopyToClipboard from './CopyToClipboard'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'

class CopyToClipboardPrototypeAttached extends React.Component {
  render() {
    return (
      <Provider theme={themes.teams} style={{ padding: 10 }}>
        <Flex gap="gap.medium" vAlign="center">
          <Text content="Commit: " />
          <Text content="3421f" color="brand" />
          <CopyToClipboard attached timeout={4000} value="lorem ipsum" />
        </Flex>
      </Provider>
    )
  }
}

class CopyToClipboardPrototypeNotAttached extends React.Component {
  render() {
    return (
      <Provider theme={themes.teams} style={{ padding: 10 }}>
        <Flex gap="gap.medium" vAlign="center">
          <Text content="Commit: " />
          <Text content="3421f" color="brand" />
          <CopyToClipboard timeout={4000} value="lorem ipsum" />
        </Flex>
      </Provider>
    )
  }
}

const CopyToClipboardPrototypes: React.FC = () => {
  return (
    <PrototypeSection title="Copy to Clipboard">
      <ComponentPrototype
        title="Attached"
        description="Attached version of Copy to Clipboard prototype"
      >
        <CopyToClipboardPrototypeAttached />
      </ComponentPrototype>
      <ComponentPrototype
        title="Not Attached"
        description="Not attached version of Copy to Clipboard prototype"
      >
        <CopyToClipboardPrototypeNotAttached />
      </ComponentPrototype>
    </PrototypeSection>
  )
}

export default CopyToClipboardPrototypes
