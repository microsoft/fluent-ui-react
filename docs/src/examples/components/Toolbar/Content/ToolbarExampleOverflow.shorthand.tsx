import * as React from 'react'
import * as _ from 'lodash'
import { Toolbar } from '@stardust-ui/react'

const ToolbarExampleOverflow = () => {
  const icons = ['bold', 'italic', 'underline']

  const itemData = _.times(40, i => ({
    key: `b${i}`,
    content: `${icons[i % icons.length]} #${i}`,
    icon: icons[i % icons.length],
  }))

  const toolbarItems = itemData.map(item => {
    return { ...item, content: undefined }
  })
  const [overflowOpen, setOverflowOpen] = React.useState(false)

  return (
    <Toolbar
      aria-labelledby="toolbar-overflow-menu"
      items={toolbarItems}
      overflow
      overflowOpen={overflowOpen}
      onOverflowOpenChange={(e, { overflowOpen }) => {
        setOverflowOpen(overflowOpen)
      }}
      getOverflowItems={startIndex => itemData.slice(startIndex)}
    />
  )
}

export default ToolbarExampleOverflow
