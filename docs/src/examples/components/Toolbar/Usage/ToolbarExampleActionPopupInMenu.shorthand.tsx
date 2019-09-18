import * as React from 'react'
import { Toolbar, Button, Form } from '@stardust-ui/react'

const CustomPopup = ({ onConfirm }) => {
  return (
    <Form
      onSubmit={onConfirm}
      fields={[
        {
          label: 'First name',
          name: 'firstName',
          id: 'first-name-inline-shorthand',
          key: 'first-name',
          required: true,
          inline: true,
        },
        {
          control: {
            as: Button,
            content: 'Submit',
          },
          key: 'submit',
        },
      ]}
    />
  )
}

const ToolbarExampleActionPopupInMenu = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  return (
    <Toolbar
      items={[
        {
          icon: 'more',
          active: menuOpen,
          menu: [
            {
              content: 'Open Popup',
              popup: (
                <CustomPopup
                  onConfirm={() => {
                    setMenuOpen(false)
                  }}
                />
              ),
            },
          ],
          menuOpen,
          onMenuOpenChange: (e, { menuOpen }) => {
            setMenuOpen(menuOpen)
          },
        },
      ]}
    />
  )
}

export default ToolbarExampleActionPopupInMenu
