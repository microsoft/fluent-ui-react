import * as React from 'react'
import { Flex as Row, Segment } from '@stardust-ui/react'

const FlexExampleShorthand = () => (
  <>
    <Row vertical gap={30} hAlign="center" vAlign="center" debug>
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
        <Row gap={30}>
          {rowOfAlignmentProps.map((alignmentProps: any) => (
            <Row
              inline
              {...alignmentProps}
              style={{ width: '100px', height: '100px', border: '1px dashed grey' }}
            >
              <Segment styles={{ width: '30px', height: '30px' }} />
            </Row>
          ))}
        </Row>
      ))}
    </Row>
  </>
)

export default FlexExampleShorthand
