import * as React from 'react'
import { Flex, Segment } from '@stardust-ui/react'

const FlexExampleItemsAlignment = () => (
  <Flex column gap="gap.large" hAlign="center" vAlign="center" debug>
    {[
      [
        { hAlign: 'start', vAlign: 'start' },
        { hAlign: 'start', vAlign: 'center' },
        { hAlign: 'start', vAlign: 'end' },
      ],
      [
        { hAlign: 'center', vAlign: 'start' },
        { hAlign: 'center', vAlign: 'center' },
        { hAlign: 'center', vAlign: 'end' },
      ],
      [
        { hAlign: 'end', vAlign: 'start' },
        { hAlign: 'end', vAlign: 'center' },
        { hAlign: 'end', vAlign: 'end' },
      ],
    ].map(rowOfAlignmentProps => (
      <Flex gap="gap.large">
        {rowOfAlignmentProps.map((alignmentProps: any) => (
          <Flex inline {...alignmentProps} style={{ width: '100px', height: '100px' }} debug>
            <Segment styles={{ width: '30px', height: '30px' }} />
          </Flex>
        ))}
      </Flex>
    ))}
  </Flex>
)

export default FlexExampleItemsAlignment
