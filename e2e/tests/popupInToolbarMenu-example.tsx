import * as React from 'react'
import { Toolbar, ToolbarItemShorthandKinds, Input, ToolbarMenu } from '@fluentui/react'

export const selectors = {
  toolbarMenu: ToolbarMenu.className,
  menuButtonId: 'menuButton',
  popupTriggerId: 'popupTrigger',
  popupElementId: 'popupElement',
  dummyButtonId: 'dummyButton',
}

const ToolbarExamplePopupInMenu = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <>
      <Toolbar
        items={[
          {
            id: selectors.menuButtonId,
            key: 'menu',
            icon: 'more',
            active: menuOpen,
            menu: {
              items: [
                {
                  id: selectors.popupTriggerId,
                  key: 'popup',
                  content: 'Open Popup',
                  popup: {
                    content: (
                      <Input id={selectors.popupElementId} icon="search" placeholder="Search..." />
                    ),
                  },
                },
              ],
            },
            menuOpen,
            onMenuOpenChange: (e, { menuOpen }) => {
              setMenuOpen(menuOpen)
            },
          },
          {
            id: selectors.dummyButtonId,
            key: 'italic',
            kind: 'toggle' as ToolbarItemShorthandKinds,
            icon: { name: 'italic', outline: true },
          },
        ]}
      />
    </>
  )
}

export default ToolbarExamplePopupInMenu
