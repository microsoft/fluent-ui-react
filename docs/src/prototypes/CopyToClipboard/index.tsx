import * as React from 'react'
import { Flex, Text, Provider, themes } from '@stardust-ui/react/src'
import CopyToClipboard from './CopyToClipboard'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'

class CopyToClipboardPrototypeAttached extends React.Component {
  render() {
    const commitID = '3422f7d'
    return (
      <Provider theme={themes.teams} style={{ padding: 10 }}>
        <Flex gap="gap.medium" vAlign="center">
          <Text content="Commit: " />
          <Text content={commitID} color="brand" />
          <CopyToClipboard attached pointing value={commitID} copyPrompt="Copy commit ID" />
        </Flex>
      </Provider>
    )
  }
}

class CopyToClipboardPrototypeNotAttached extends React.Component {
  render() {
    const commitID = '3421f7d'
    return (
      <Provider theme={themes.teams} style={{ padding: 10 }}>
        <Flex gap="gap.medium" vAlign="center">
          <Text content="Commit: " />
          <Text content={commitID} color="brand" />
          <CopyToClipboard pointing value={commitID} copyPrompt="Copy commit ID" />
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
