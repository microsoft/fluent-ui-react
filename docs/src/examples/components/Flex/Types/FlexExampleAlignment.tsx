import * as React from 'react'
import { Flex, Text } from '@stardust-ui/react'

const FlexExampleAlignment = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '7rem 7rem 7rem',
      gridTemplateRows: '7rem 7rem 7rem',
    }}
  >
    {alignments.map(alignment => (
      <div>
        <Text size="smaller" color="red" content={Object.keys(alignment).join(' ')} />
        <Flex
          {...alignment}
          debug
          style={{
            width: '5rem',
            height: '5rem',
          }}
        >
          <div
            style={{
              width: '2rem',
              height: '2rem',
              backgroundColor: 'gray',
            }}
          />
        </Flex>
      </div>
    ))}
  </div>
)

const alignments = [
  { left: true, top: true },
  { left: true, center: true },
  { left: true, bottom: true },
  { center: true, top: true },
  { center: true },
  { center: true, bottom: true },
  { right: true, top: true },
  { right: true, center: true },
  { right: true, bottom: true },
]

export default FlexExampleAlignment
