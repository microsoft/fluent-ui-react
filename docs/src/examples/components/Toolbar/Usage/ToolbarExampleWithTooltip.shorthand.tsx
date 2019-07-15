import * as React from 'react'
import {
  Toolbar,
  Input,
  Button,
  Form,
  Tooltip,
  ToolbarItemShorthandKinds,
} from '@stardust-ui/react'
import { useBooleanKnob } from '@stardust-ui/docs-components'

const ToolbarExampleShorthand = () => {
  const [isBold, setBold] = useBooleanKnob({ name: 'bold', initialValue: true })

  const [highlightOpen, setHighlightOpen] = useBooleanKnob({
    name: 'highlightOpen',
    initialValue: false,
  })
  const [fontColorActive, setFontColorActive] = useBooleanKnob({
    name: 'fontColorActive',
    initialValue: false,
  })

  const [moreMenuOpen, setMoreMenuOpen] = useBooleanKnob({
    name: 'moreMenuOpen',
    initialValue: false,
  })

  const [bulletListActive, setBulletListActive] = React.useState(false)
  const [numberListActive, setNumberListActive] = React.useState(false)

  return (
    <>
      <Toolbar
        items={[
          {
            key: 'bold',
            kind: 'toggle' as ToolbarItemShorthandKinds,
            active: isBold,
            tooltip: 'Bold',
            icon: { name: 'bold', outline: true },
            onClick: () => {
              setBold(!isBold)
            },
          },
          { key: 'divider1', kind: 'divider' as ToolbarItemShorthandKinds },
          {
            key: 'highlight',
            icon: { name: 'highlight', outline: true },
            active: highlightOpen,
            tooltip: 'Highlight',
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
            tooltip: 'Font color',
            popup: {
              content: <Input icon="search" placeholder="Search..." />,
              onOpenChange: () => {
                setFontColorActive(!fontColorActive)
              },
            },
          },
          {
            key: 'radiogroup',
            kind: 'group' as ToolbarItemShorthandKinds,
            items: [
              {
                key: 'bullets',
                icon: { name: 'bullets', outline: true },
                tooltip: 'Bullets',
                active: bulletListActive,
                onClick: () => {
                  setBulletListActive(!bulletListActive)
                  // deselect other radio item
                  setNumberListActive(false)
                },
                'aria-label': 'bullet list',
              },
              {
                key: 'number-list',
                icon: { name: 'number-list', outline: true },
                active: numberListActive,
                tooltip: 'Number list',
                onClick: () => {
                  setNumberListActive(!numberListActive)
                  // deselect other radio item
                  setBulletListActive(false)
                },
                'aria-label': 'number list',
              },
            ].map(radioItem => render =>
              render(radioItem, (RadioItem, props) => {
                const { tooltip, ...rest } = props
                return <Tooltip trigger={<RadioItem {...rest} />} content={tooltip} />
              }),
            ),
          },
          {
            key: 'more',
            icon: { name: 'more', outline: true },
            active: moreMenuOpen,
            tooltip: 'More options',
            menu: [
              {
                content: 'Quote',
                icon: 'quote',
              },
              {
                content: 'Code snippet',
                icon: 'code-snippet',
              },
            ],
            menuOpen: moreMenuOpen,
            onMenuOpenChange: (e, { menuOpen }) => {
              setMoreMenuOpen(menuOpen)
            },
          },
        ].map(item =>
          item.tooltip
            ? render =>
                render(
                  /* what to render */
                  item,

                  /* how to render */
                  (ToolbarItem, props) => {
                    const { tooltip, ...rest } = props
                    return <Tooltip trigger={<ToolbarItem {...rest} />} content={tooltip} />
                  },
                )
            : item,
        )}
      />
    </>
  )
}

const fields = [
  {
    label: 'Full name',
    name: 'fullName',
    id: 'full-name-inline-shorthand',
    key: 'full-name',
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

export default ToolbarExampleShorthand
