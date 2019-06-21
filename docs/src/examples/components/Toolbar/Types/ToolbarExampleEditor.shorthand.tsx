import * as React from 'react'
import { Toolbar, Input, Button, Form } from '@stardust-ui/react'

const fields = [
  {
    label: 'First name',
    name: 'firstName',
    id: 'first-name-inline-shorthand',
    key: 'first-name',
    required: true,
    inline: true,
  },
  {
    label: 'Last name',
    name: 'lastName',
    id: 'last-name-inline-shorthand',
    key: 'last-name',
    required: true,
    inline: true,
  },
  {
    label: 'I agree to the Terms and Conditions',
    control: {
      as: 'input',
    },
    type: 'checkbox',
    id: 'conditions-inline-shorthand',
    key: 'conditions',
  },
  {
    control: {
      as: Button,
      content: 'Submit',
    },
    key: 'submit',
  },
]

const HighlightPopup = ({ onConfirm }) => {
  return <Form onSubmit={onConfirm} fields={fields} />
}

const ToolbarExampleShorthand = () => {
  const [isBold, setBold] = React.useState(true)
  const [isItalic, setItalic] = React.useState(false)
  const [isUnderline, setUnderline] = React.useState(false)
  const [isStrike, setStrike] = React.useState(false)

  const [highlightOpen, setHighlightOpen] = React.useState(false)
  const [fontColorActive, setFontColorActive] = React.useState(false)

  const [bulletListActive, setBulletListActive] = React.useState(false)
  const [numberListActive, setNumberListActive] = React.useState(false)
  const [toDoListActive, setToDoListActive] = React.useState(false)

  return (
    <Toolbar
      items={[
        {
          key: 'bold',
          kind: 'toggle',
          active: isBold,
          icon: { name: 'bold', outline: true },
          onClick: () => {
            setBold(!isBold)
          },
        },
        {
          key: 'italic',
          kind: 'toggle',
          active: isItalic,
          icon: { name: 'italic', outline: true },
          onClick: () => {
            setItalic(!isItalic)
          },
        },
        {
          key: 'underline',
          kind: 'toggle',
          active: isUnderline,
          icon: { name: 'underline', outline: true },
          onClick: () => {
            setUnderline(!isUnderline)
          },
        },
        {
          key: 'strike',
          kind: 'toggle',
          active: isStrike,
          disabled: true,
          icon: { name: 'strike', outline: true },
          onClick: () => {
            setStrike(!isStrike)
          },
        },
        { key: 'divider1', kind: 'divider' },
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
        { key: 'font-size', icon: { name: 'font-size', outline: true } },
        { key: 'remove-format', icon: { name: 'remove-format', outline: true } },
        { key: 'divider2', kind: 'divider' },
        {
          key: 'radiogroup',
          kind: 'group',
          items: [
            {
              key: 'bullets',
              icon: { name: 'bullets', outline: true },
              active: bulletListActive,
              onClick: () => {
                setBulletListActive(!bulletListActive)

                // deselect other radio items
                setNumberListActive(false)
                setToDoListActive(false)
              },
            },
            {
              key: 'number-list',
              icon: { name: 'number-list', outline: true },
              active: numberListActive,
              onClick: () => {
                setNumberListActive(!numberListActive)

                // deselect other radio items
                setBulletListActive(false)
                setToDoListActive(false)
              },
            },
            {
              key: 'to-do-list',
              icon: { name: 'to-do-list', outline: true },
              active: toDoListActive,
              onClick: () => {
                setToDoListActive(!toDoListActive)

                // deselect other radio items
                setBulletListActive(false)
                setNumberListActive(false)
              },
            },
          ],
        },
        { key: 'divider3', kind: 'divider' },
        { key: 'outdent', icon: { name: 'outdent', outline: true } },
        { key: 'indent', icon: { name: 'indent', outline: true } },
        { key: 'divider4', kind: 'divider' },
        { key: 'more', icon: { name: 'more', outline: true } },
      ]}
    />
  )
}

export default ToolbarExampleShorthand
