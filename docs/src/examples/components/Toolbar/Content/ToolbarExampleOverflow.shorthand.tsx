import * as React from 'react'
import * as _ from 'lodash'
import { Toolbar } from '@stardust-ui/react'

const ToolbarExampleOverflow = () => {
  const icons = ['bold', 'italic', 'underline']

  const itemData = [
    ..._.times(30, i => ({
      key: `a${i}`,
      content: `${icons[i % icons.length]} #${i}`,
      icon: icons[i % icons.length],
    })),
  ]

  const toolbarItems = itemData.map(item => ({ ...item, content: undefined }))
  const overflowItems = itemData

  const overflowMenuKey = 'overflow-menu'

  const [overflowMenuOpen, setOverflowMenuOpen] = React.useState(false)

  return (
    <Toolbar
      items={toolbarItems}
      onReduceItems={(renderedItems, measures) => {
        let numberOfFits = measures.findIndex(measure => !measure.leftFits || !measure.rightFits)

        // if the first item which does not fit is the overflow menu, we need to remove one more regular item
        if (numberOfFits < renderedItems.length) {
          const firstCutItem = renderedItems[numberOfFits]
          const firstCutItemIsOverflowMenu =
            _.isObject(firstCutItem) && firstCutItem['key'] === overflowMenuKey
          if (firstCutItemIsOverflowMenu) {
            --numberOfFits
          }
        }

        // if there is nothing more to hide, stop the reduce
        if (numberOfFits < 0) {
          return null
        }

        // console.log(`${numberOfFits}/${toolbarItems.length} fit`)

        return [
          ...toolbarItems.slice(0, numberOfFits),
          {
            key: overflowMenuKey,
            icon: 'more',
            menu: overflowItems.slice(numberOfFits),
            menuOpen: overflowMenuOpen,
            onMenuOpenChange: (_, { menuOpen }) => {
              setOverflowMenuOpen(menuOpen)
            },
          },
        ]
      }}
    />
  )
}

export default ToolbarExampleOverflow
