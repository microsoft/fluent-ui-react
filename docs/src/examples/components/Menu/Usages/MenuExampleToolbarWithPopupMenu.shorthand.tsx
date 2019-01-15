import * as React from 'react'
import { Menu, toolbarBehavior, toolbarButtonBehavior } from '@stardust-ui/react'

const items = [
  {
    key: 'like',
    icon: {
      name: 'like',
      variables: { outline: true },
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Like',
  },
  {
    key: 'bookmark',
    icon: {
      name: 'bookmark',
      variables: { outline: true },
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'Bookmark tool',
  },
  {
    key: 'more',
    icon: {
      name: 'more',
      variables: { outline: true },
    },
    accessibility: toolbarButtonBehavior,
    'aria-label': 'More options',
    menu: {
      items: [
        {
          key: '1',
          content: 'Save this message',
          icon: {
            name: 'bookmark',
            variables: { outline: true },
          },
        },
        {
          key: '2',
          content: 'Delete this message',
          icon: {
            name: 'trash-can',
            variables: { outline: true },
          },
        },
      ],
    },
  },
]

class MenuExampleToolbarWithPopupMenuShorthand extends React.Component {
  render() {
    return (
      <Menu
        defaultActiveIndex={0}
        items={items}
        iconOnly
        accessibility={toolbarBehavior}
        aria-label="Compose Editor"
      />
    )
  }
}

export default MenuExampleToolbarWithPopupMenuShorthand
