import * as React from 'react'
import * as _ from 'lodash'
import { Toolbar, Checkbox, Text } from '@stardust-ui/react'

const CustomCallItem = props => {
  const [checked, setChecked] = React.useState(false)
  return (
    <Toolbar.Item
      design={{ ...(checked && { width: '200px' }) }}
      styles={{ border: '1px solid pink' }}
      {...props}
      onClick={() => {
        setChecked(!checked)
      }}
    />
  )
}

const ToolbarExampleOverflow = () => {
  const icons = ['bold', 'italic', 'underline']

  const itemData = [
    ..._.times(8, i => ({
      key: `a${i}`,
      content: `${icons[i % icons.length]} #${i}`,
      icon: icons[i % icons.length],
    })),
    {
      key: 'custom-focusable-text',
      content: <Text content="Focusable" />,
      focusable: true,
      kind: 'custom',
    },

    render =>
      render({ key: 'special', icon: 'call' }, (Component, props) => <CustomCallItem {...props} />),

    ..._.times(30, i => ({
      key: `b${i}`,
      content: `${icons[i % icons.length]} #${i}`,
      icon: icons[i % icons.length],
    })),
  ]

  const toolbarItems = itemData.map(item => {
    if (typeof item === 'function') {
      return item
    }

    return {
      ...item,
      content: item.kind === 'custom' ? item.content : undefined,
    }
  })
  // const overflowItems = itemData
  //
  // const overflowMenuKey = 'overflow-menu'
  //
  // const [overflowMenuOpen, setOverflowMenuOpen] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const [bold, setBold] = React.useState(true)

  return (
    <>
      <Checkbox
        toggle
        label="visible"
        checked={visible}
        onChange={(e, { checked }) => {
          setVisible(checked)
          visibleTime = performance.now()
        }}
      />
      <Checkbox
        toggle
        label="show bold buttons"
        checked={bold}
        onChange={(e, { checked }) => {
          setBold(checked)
        }}
      />
      {visible && (
        <Toolbar
          overflow
          items={bold ? toolbarItems : toolbarItems.filter(i => i.icon !== 'bold')}
          // onReduceItems={(renderedItems, measures) => {
          //   let numberOfFits = measures.findIndex(
          //     measure => !measure.leftFits || !measure.rightFits,
          //   )
          //
          //   // if the first item which does not fit is the overflow menu, we need to remove one more regular item
          //   if (numberOfFits < renderedItems.length) {
          //     const firstCutItem = renderedItems[numberOfFits]
          //     const firstCutItemIsOverflowMenu =
          //       _.isObject(firstCutItem) && firstCutItem['key'] === overflowMenuKey
          //     if (firstCutItemIsOverflowMenu) {
          //       --numberOfFits
          //     }
          //   }
          //
          //   // if there is nothing more to hide, stop the reduce
          //   if (numberOfFits < 0) {
          //     return null
          //   }
          //
          //   // console.log(`${numberOfFits}/${toolbarItems.length} fit`)
          //
          //   return [
          //     ...toolbarItems.slice(0, numberOfFits),
          //     {
          //       key: overflowMenuKey,
          //       icon: 'more',
          //       menu: overflowItems.slice(numberOfFits),
          //       menuOpen: overflowMenuOpen,
          //       onMenuOpenChange: (_, { menuOpen }) => {
          //         setOverflowMenuOpen(menuOpen)
          //       },
          //     },
          //   ]
          // }}
        />
      )}
    </>
  )
}

export default ToolbarExampleOverflow
