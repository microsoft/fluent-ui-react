import * as React from 'react'
import * as _ from 'lodash'
import {
  Toolbar,
  Checkbox,
  Text,
  ShorthandCollection,
  ToolbarItemProps,
  ToolbarItemShorthandKinds,
  Input,
  Tooltip,
  Flex,
} from '@stardust-ui/react'

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
  const [menuOpen, setMenuOpen] = React.useState(false)

  const itemData: ShorthandCollection<ToolbarItemProps, ToolbarItemShorthandKinds> = [
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

    {
      key: 'with-popup',
      icon: 'open-outside',
      popup: { content: <Input icon="search" placeholder="Search..." /> },
    },
    {
      key: 'with-menu',
      icon: 'menu',
      menu: ['one', 'two', 'three'],
      menuOpen,
      onMenuOpenChange: (e, { menuOpen }) => {
        setMenuOpen(menuOpen)
      },
    },
    render =>
      render({ key: 'with-tooltip', icon: 'info' }, (Component, props) => (
        <Tooltip key={props.key} content="This is tooltip">
          <Component {...props} />
        </Tooltip>
      )),
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

    // @ts-ignore
    return { ...item, content: item.kind === 'custom' ? item.content : undefined }
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
        <Flex>
          <Toolbar
            overflow
            styles={{ minWidth: 0, flexGrow: 1 }}
            items={bold ? toolbarItems : toolbarItems.filter(i => i['icon'] !== 'bold')}
          />
          <Toolbar items={[{ key: 'trash', icon: 'trash-can' }]} />
        </Flex>
      )}
    </>
  )
}

export default ToolbarExampleOverflow
