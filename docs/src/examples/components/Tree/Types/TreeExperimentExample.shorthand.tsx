import * as React from 'react'
import { TreeFlat } from '@stardust-ui/react'
import * as _ from 'lodash'

const minItems = 3
const maxItems = 6
const maxLevel = 3

function generateItems(parent = '', currentLevel = 0) {
  if (currentLevel === maxLevel) {
    return
  }

  return _.times(_.random(minItems, maxItems), index => ({
    key: `${parent}-${currentLevel}-${index}`,
    title: `Item-${parent}-${currentLevel}-${index}`,
    items: generateItems(`${currentLevel}-${index}`, currentLevel + 1),
  }))
}

const items = generateItems()

const TreeExampleShorthand = () => <TreeFlat items={items} />

export default TreeExampleShorthand
