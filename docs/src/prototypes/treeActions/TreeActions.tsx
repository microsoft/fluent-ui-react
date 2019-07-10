import * as React from 'react'
import keyboardKey from 'keyboard-key'
import {
  Checkbox,
  Tree,
  ItemLayout,
  Image,
  ContextMenu,
  TreeTitle,
  Toolbar,
} from '@stardust-ui/react'

const itemMenu = { items: ['Add', 'Remove'] }
// const titleMenu = { items: ['All'] }

const images = [
  'ade.jpg',
  'chris.jpg',
  'christian.jpg',
  'daniel.jpg',
  'elliot.jpg',
  'helen.jpg',
  'jenny.jpg',
]

// const title = name => ({
// onKeyDown: handleItemKeyDown,
// content: (name
// <ItemLayout
//   header={name}
//   headerMedia={<Toolbar aria-hidden={true} items={['All']} onKeyDown={handleToolbarKeyDown} />}
// />
// ),
// })

const item = (name, img, hidden) => ({
  ...(!hidden && { onKeyDown: handleItemKeyDown }),
  content: (
    <ItemLayout
      media={<Image src={`public/images/avatar/small/${images[img]}`} avatar />}
      header={name}
      headerMedia={
        <Toolbar
          role={hidden ? 'presentation' : 'toolbar'}
          aria-hidden={hidden}
          onKeyDown={handleToolbarKeyDown}
          items={[
            { icon: 'plus', title: 'Accept', as: hidden ? 'span' : 'button' },
            { icon: 'delete', title: 'Decline', as: hidden ? 'span' : 'button' },
          ]}
        />
      }
    />
  ),
})

const handleItemKeyDown = e => {
  const code = keyboardKey.getCode(e)
  if (code === keyboardKey.ArrowRight) {
    e.currentTarget.querySelector(`.${Toolbar.Item.className}`).focus()
  }
}

const handleToolbarKeyDown = e => {
  const code = keyboardKey.getCode(e)
  if (code === keyboardKey.ArrowLeft) {
    e.currentTarget.closest(`.${TreeTitle.className}`).focus()
    e.stopPropagation()
  }
}

const itemWithMenu = (name, img, hidden) => render =>
  render(item(name, img, hidden), (ComponentType, props) =>
    hidden ? (
      <ContextMenu menu={itemMenu} trigger={<ComponentType {...props} />} />
    ) : (
      <ComponentType {...props} />
    ),
  )

// const titleWithMenu = name => render =>
//   render(name, (ComponentType, props) => (
//     <ContextMenu menu={titleMenu} trigger={<ComponentType {...props} />} />
//   ))

class TreeActions extends React.Component<{}, { hidden: boolean }> {
  // state = {
  //   selectedBannerName: bannerRadioItems[0].value as BannerName,
  //   open: true,
  // }

  state = { hidden: false }

  items = hidden => [
    {
      key: '1',
      title: 'Participants', // titleWithMenu('Participants'),
      items: [
        {
          key: '11',
          title: itemWithMenu('Tywin', 1, hidden),
        },
        {
          key: '12',
          title: itemWithMenu('Jaime', 2, hidden),
        },
        {
          key: '13',
          title: itemWithMenu('Cersei', 3, hidden),
        },
        {
          key: '14',
          title: itemWithMenu('Tyrion', 4, hidden),
        },
      ],
    },
    {
      key: '2',
      title: 'Waiting',
      items: [
        {
          key: '211',
          title: itemWithMenu('Lancel', 5, hidden),
        },
        {
          key: '212',
          title: itemWithMenu('Willem', 6, hidden),
        },
        {
          key: '213',
          title: itemWithMenu('Martyn', 0, hidden),
        },
      ],
    },
  ]

  render() {
    return (
      <>
        <Checkbox
          label="Hide toolbar from screen reader (click to open context menu with actions)"
          onChange={(_, props) => this.setState({ hidden: props.checked })}
        />

        <Tree styles={{ width: '300px' }} items={this.items(this.state && this.state.hidden)} />
      </>
    )
  }
}

export default TreeActions
