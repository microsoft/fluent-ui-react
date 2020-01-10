import * as React from 'react'
import { Toolbar, ToolbarItemShorthandKinds, Input } from '@fluentui/react'

export const selectors = {
  toolbarMenuId: 'toolbarMenu',
  menuButtonId: 'menuButton',
  popupTriggerId: 'popupTrigger',
  popupElementId: 'popupElement',
  submenuTriggerId: 'submenuTrigger',
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
              id: selectors.toolbarMenuId,
              items: [
                {
                  id: selectors.submenuTriggerId,
                  key: 'submenu',
                  content: 'Open Submenu',
                  menu: [
                    {
                      content: 'Open Popup',
                      id: selectors.popupTriggerId,
                      key: 'popup',
                      popup: {
                        content: (
                          <Input
                            id={selectors.popupElementId}
                            icon="search"
                            placeholder="Search..."
                          />
                        ),
                      },
                    },
                  ],
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
