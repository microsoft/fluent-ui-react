import * as React from 'react'
import * as _ from 'lodash'

import { ResizeGroup, Menu, Flex } from '@stardust-ui/react'

// const items = _.times(10, (i) => (<Button content={`Button ${i}`} />))

const randomIcon = i => {
  const icons = ['home', 'bold', 'italic', 'bullets', 'edit']
  return icons[i % icons.length]
}

const items = _.times(60, i => ({
  key: i,
  // content: `item ${i}`,
  icon: randomIcon(i),
}))

const ResizeGroupExample = () => (
  <Flex>
    <Flex.Item size="size.half">
      <div style={{ overflow: 'hidden' }}>
        <ResizeGroup
          items={items}
          renderItems={currentItems => {
            const overflowItems =
              currentItems.length < items.length
                ? [{ key: 'plus', content: `+${items.length - currentItems.length}` }]
                : []

            return <Menu iconOnly items={[...currentItems, ...overflowItems]} />
          }}
          reduce={(current, initial) => {
            return [...current.slice(0, -1)]
          }}
        />
      </div>
    </Flex.Item>
    <Flex.Item size="size.half">
      <div>empty</div>
    </Flex.Item>
  </Flex>
)
export default ResizeGroupExample
