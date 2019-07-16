import * as React from 'react'
import * as _ from 'lodash'
import { Tree } from '@stardust-ui/react'

const maxLevel = 1
const minItems = 50
const maxItems = 100
const getItemsNumber = () => _.random(minItems, maxItems)

function generateLevel(level = 0, parent = '') {
  if (level === 0) {
  }
  const result = []
  for (let index = 0; index < getItemsNumber(); index++) {
    const item = {
      key: `${parent}${parent ? '-' : ''}${index}`,
      title: `${parent}${parent ? '-' : ''}${index}`,
      // open: true,
      ...(level < maxLevel && { items: generateLevel(level + 1, `${parent}${index}`) }),
    }
    result.push(item)
  }
  return result
}

const items = generateLevel()

const VirtualizedTree = () => <Tree virtualized items={items} containerSize={200} itemSize={20} />

export default VirtualizedTree
