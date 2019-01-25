import * as React from 'react'
import { Flex, Segment } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Flex.Column gap={30} center debug>
      {[
        [
          { hAlign: 'start', vAlign: 'start' },
          { hAlign: 'start', vAlign: 'center' },
          { hAlign: 'start', vAlign: 'end' },
        ],
        [
          { hAlign: 'center', vAlign: 'start' },
          { center: true },
          { hAlign: 'center', vAlign: 'end' },
        ],
        [
          { hAlign: 'end', vAlign: 'start' },
          { hAlign: 'end', vAlign: 'center' },
          { hAlign: 'end', vAlign: 'end' },
        ],
      ].map(rowOfAlignmentProps => (
        <Flex.Row gap={30}>
          {rowOfAlignmentProps.map(alignmentProps => (
            <Flex
              inline
              {...alignmentProps}
              style={{ width: '100px', height: '100px', border: '1px dashed grey' }}
            >
              <Segment styles={{ width: '30px', height: '30px' }} />
            </Flex>
          ))}
        </Flex.Row>
      ))}
    </Flex.Column>
  </>
)

export default FlexExampleShorthand
