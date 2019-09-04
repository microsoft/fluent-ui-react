import * as React from 'react'
import { Flex, Provider, Text } from '@stardust-ui/react'
import CopyToClipboard from './CopyToClipboard'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'
import themeOverrides from './themeOverrides'

type CopyToClipboardPrototypeProps = {
  value: string
  attached?: boolean
}

const CopyToClipboardPrototype: React.FC<CopyToClipboardPrototypeProps> = props => {
  return (
    <Provider theme={themeOverrides}>
      <Flex gap="gap.medium" vAlign="center" padding="padding.medium">
        <Text content="Commit: " />
        <Text content={props.value} color="brand" />
        <CopyToClipboard
          attached={props.attached}
          pointing
          value={props.value}
          copyPrompt="Copy commit ID"
        />
      </Flex>
    </Provider>
  )
}

const CopyToClipboardPrototypes: React.FC = () => {
  const commitID = '3422f7d'
  return (
    <PrototypeSection title="Copy to Clipboard">
      <ComponentPrototype
        title="Attached"
        description="Attached version of Copy to Clipboard prototype"
      >
        <CopyToClipboardPrototype attached value={commitID} />
      </ComponentPrototype>
      <ComponentPrototype
        title="Not Attached"
        description="Not attached version of Copy to Clipboard prototype"
      >
        <CopyToClipboardPrototype value={commitID} />
      </ComponentPrototype>
    </PrototypeSection>
  )
}

export default CopyToClipboardPrototypes
