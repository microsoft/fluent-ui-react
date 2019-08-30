import * as React from 'react'
import { Flex, Text } from '@stardust-ui/react/src'
import CopyToClipboard from './CopyToClipboard'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'

class CopyToClipboardPrototypeAttached extends React.Component {
  render() {
    const commitID = '3422f7d'
    return (
      <Flex gap="gap.medium" vAlign="center" padding="padding.medium">
        <Text content="Commit: " />
        <Text content={commitID} color="brand" />
        <CopyToClipboard attached pointing value={commitID} copyPrompt="Copy commit ID" />
      </Flex>
    )
  }
}

class CopyToClipboardPrototypeNotAttached extends React.Component {
  render() {
    const commitID = '3421f7d'
    return (
      <Flex gap="gap.medium" vAlign="center" padding="padding.medium">
        <Text content="Commit: " />
        <Text content={commitID} color="brand" />
        <CopyToClipboard pointing value={commitID} copyPrompt="Copy commit ID" />
      </Flex>
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
