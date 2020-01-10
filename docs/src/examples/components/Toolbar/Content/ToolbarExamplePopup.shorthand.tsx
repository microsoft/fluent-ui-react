import * as React from 'react'
import { Toolbar, Input, Button, Form } from '@fluentui/react'

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
      aria-label="Toolbar can contain a popup"
      items={[
        {
          key: 'highlight',
          icon: { name: 'highlight', outline: true },
          active: highlightOpen,
          title: 'Highlight',
          popup: {
            content: (
              <HighlightPopup
                onConfirm={() => {
                  setHighlightOpen(false)
                }}
              />
            ),
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
          title: 'Font color',
          popup: {
            content: <Input icon="search" placeholder="Search..." />,
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
