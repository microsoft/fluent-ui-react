import * as React from 'react'
import { Toolbar, ToolbarItemShorthandKinds, Input } from '@stardust-ui/react'

const PopupContent = <Input icon="search" placeholder="Search..." />

const ToolbarExamplePopupInMenu = () => {
  /* TODO: can these be removed? */
  const [menu1Open, setMenu1Open] = React.useState(false)
  const [menu2Open, setMenu2Open] = React.useState(false)

  return (
    <>
      <Toolbar
        items={[
          {
            key: 'menu1',
            icon: 'more',
            active: menu1Open,
            menu: {
              items: [
                {
                  key: 'popup1',
                  content: 'Open Popup',
                  popup: {
                    content: PopupContent,
                  },
                },
              ],
            },
            menuOpen: menu1Open,
            onMenuOpenChange: (e, { menuOpen }) => {
              setMenu1Open(menuOpen)
            },
          },
          {
            key: 'italic',
            kind: 'toggle' as ToolbarItemShorthandKinds,
            icon: { name: 'italic', outline: true },
          },
          {
            key: 'menu2',
            icon: 'more',
            active: menu2Open,
            menu: {
              items: [
                {
                  key: 'popup2',
                  content: 'Open Popup',
                  popup: {
                    content: PopupContent,
                  },
                },
              ],
            },
            menuOpen: menu2Open,
            onMenuOpenChange: (e, { menuOpen }) => {
              setMenu2Open(menuOpen)
            },
          },
        ]}
      />
    </>
  )
}

export default ToolbarExamplePopupInMenu
