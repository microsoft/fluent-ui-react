import * as React from 'react'
import { Toolbar, Input, Button, Form } from '@stardust-ui/react'

const HighlightPopup = ({ onConfirm }) => {
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

const ToolbarExamplePopupShorthand = () => {
  const [highlightOpen, setHighlightOpen] = React.useState(false)
  const [fontColorActive, setFontColorActive] = React.useState(false)
  return (
    <Toolbar
      items={[
        {
          key: 'highlight',
          icon: { name: 'highlight', outline: true },
          active: highlightOpen,
          popup: {
            content: {
              content: (
                <HighlightPopup
                  onConfirm={() => {
                    setHighlightOpen(false)
                  }}
                />
              ),
            },
            onOpenChange: (e, { open }) => {
              setHighlightOpen(open)
            },
            open: highlightOpen,
          },
        },
        {
          key: 'font-color',
          icon: { name: 'font-color', outline: true },
          active: fontColorActive,
          popup: {
            content: { content: <Input icon="search" placeholder="Search..." /> },
            onOpenChange: () => {
              setFontColorActive(!fontColorActive)
            },
          },
        },
      ]}
    />
  )
}

export default ToolbarExamplePopupShorthand
