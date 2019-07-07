import * as React from 'react'
import keyboardKey from 'keyboard-key'
import {
  Tree,
  ItemLayout,
  Image,
  ContextMenu,
  Menu,
  TreeTitle,
  menuAsToolbarBehavior,
} from '@stardust-ui/react'

const itemMenu = { items: ['Add', 'Remove'] }
const titleMenu = { items: ['All'] }

const images = [
  'ade.jpg',
  'chris.jpg',
  'christian.jpg',
  'daniel.jpg',
  'elliot.jpg',
  'helen.jpg',
  'jenny.jpg',
]

const title = name => ({
  onKeyDown: handleItemKeyDown,
  content: (
    <ItemLayout
      header={name}
      headerMedia={
        <Menu
          iconOnly
          accessibility={menuAsToolbarBehavior}
          items={['All']}
          onKeyDown={handleToolbarKeyDown}
        />
      }
    />
  ),
})

const item = (name, img) => ({
  onKeyDown: handleItemKeyDown,
  content: (
    <ItemLayout
      media={<Image src={`public/images/avatar/small/${images[img]}`} avatar />}
      header={name}
      headerMedia={
        <Menu
          iconOnly
          accessibility={menuAsToolbarBehavior}
          onKeyDown={handleToolbarKeyDown}
          items={[{ icon: 'plus' }, { icon: 'delete' }]}
        />
      }
    />
  ),
})

const handleItemKeyDown = e => {
  const code = keyboardKey.getCode(e)
  if (code === keyboardKey.ArrowRight) {
    e.currentTarget.querySelector(`.${Menu.Item.className}`).focus()
  }
}

const handleToolbarKeyDown = e => {
  const code = keyboardKey.getCode(e)
  if (code === keyboardKey.ArrowLeft) {
    e.currentTarget.closest(`.${TreeTitle.className}`).focus()
    e.stopPropagation()
  }
}

const itemWithMenu = (name, img) => render =>
  render(item(name, img), (ComponentType, props) => (
    <ContextMenu menu={itemMenu} trigger={<ComponentType {...props} />} />
  ))

const titleWithMenu = name => render =>
  render(title(name), (ComponentType, props) => (
    <ContextMenu menu={titleMenu} trigger={<ComponentType {...props} />} />
  ))

class TreeActions extends React.Component<{}, {}> {
  // state = {
  //   selectedBannerName: bannerRadioItems[0].value as BannerName,
  //   open: true,
  // }

  items = [
    {
      key: '1',
      title: titleWithMenu('Participants'),
      items: [
        {
          key: '11',
          title: itemWithMenu('Tywin', 1),
        },
        {
          key: '12',
          title: itemWithMenu('Jaime', 2),
        },
        {
          key: '13',
          title: itemWithMenu('Cersei', 3),
        },
        {
          key: '14',
          title: itemWithMenu('Tyrion', 4),
        },
      ],
    },
    {
      key: '2',
      title: 'Waiting',
      items: [
        {
          key: '211',
          title: itemWithMenu('Lancel', 5),
        },
        {
          key: '212',
          title: itemWithMenu('Willem', 6),
        },
        {
          key: '213',
          title: itemWithMenu('Martyn', 0),
        },
      ],
    },
  ]

  render() {
    return <Tree styles={{ width: '300px' }} items={this.items} />
  }
}

export default TreeActions
