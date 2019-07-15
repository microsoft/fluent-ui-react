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
  const [isBold, setBold] = useBooleanKnob({ name: 'bold', initialValue: true })
  const [isItalic, setItalic] = useBooleanKnob({ name: 'isItalic', initialValue: false })
  const [isUnderline, setUnderline] = useBooleanKnob({ name: 'isUnderline', initialValue: false })
  const [isStrike, setStrike] = useBooleanKnob({ name: 'isStrike', initialValue: false })

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

  const [log, setLog] = React.useState<string[]>([])
  const writeLog = message => {
    setLog(prevLog => [`${new Date().toLocaleTimeString()}: ${message}`, ...prevLog])
  }

  const [bulletListActive, setBulletListActive] = React.useState(false)
  const [numberListActive, setNumberListActive] = React.useState(false)
  const [toDoListActive, setToDoListActive] = React.useState(false)

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
          {
            key: 'italic',
            kind: 'toggle' as ToolbarItemShorthandKinds,
            active: isItalic,
            tooltip: 'Italic',
            icon: { name: 'italic', outline: true },
            onClick: () => {
              setItalic(!isItalic)
            },
          },
          {
            key: 'underline',
            kind: 'toggle' as ToolbarItemShorthandKinds,
            active: isUnderline,
            tooltip: 'Underline',
            icon: { name: 'underline', outline: true },
            onClick: () => {
              setUnderline(!isUnderline)
            },
          },
          {
            key: 'strike',
            kind: 'toggle' as ToolbarItemShorthandKinds,
            active: isStrike,
            disabled: true,
            // TODO: should this have a tooltip? And be focusable
            // tooltip: 'Strike',
            icon: { name: 'strike', outline: true },
            onClick: () => {
              setStrike(!isStrike)
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
          { key: 'font-size', icon: { name: 'font-size', outline: true }, tooltip: 'Font size' },
          {
            key: 'remove-format',
            icon: { name: 'remove-format', outline: true },
            tooltip: 'Remove format',
          },
          { key: 'divider2', kind: 'divider' as ToolbarItemShorthandKinds },
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

                  // deselect other radio items
                  setNumberListActive(false)
                  setToDoListActive(false)
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

                  // deselect other radio items
                  setBulletListActive(false)
                  setToDoListActive(false)
                },
                'aria-label': 'number list',
              },
              {
                key: 'to-do-list',
                icon: { name: 'to-do-list', outline: true },
                active: toDoListActive,
                tooltip: 'To do list',
                onClick: () => {
                  setToDoListActive(!toDoListActive)

                  // deselect other radio items
                  setBulletListActive(false)
                  setNumberListActive(false)
                },
                'aria-label': 'to do list',
              },
            ].map(radioItem => render =>
              render(radioItem, (RadioItem, props) => {
                const { tooltip, ...rest } = props
                return <Tooltip trigger={<RadioItem {...rest} />} content={tooltip} />
              }),
            ),
          },
          { key: 'divider3', kind: 'divider' as ToolbarItemShorthandKinds },
          { key: 'outdent', icon: { name: 'outdent', outline: true }, tooltip: 'Outdent' },
          { key: 'indent', icon: { name: 'indent', outline: true }, tooltip: 'Indent' },
          { key: 'divider4', kind: 'divider' as ToolbarItemShorthandKinds },
          {
            key: 'more',
            icon: { name: 'more', outline: true },
            active: moreMenuOpen,
            tooltip: 'More options',
            menu: [
              {
                content: 'Quote',
                icon: 'quote',
                onClick: () => {
                  writeLog('... -> Quote')
                },
              },
              {
                content: 'Link',
                icon: 'link',
                disabled: true,
                onClick: () => {
                  writeLog('SHOULD NOT BE CALLED, ITEM IS DISABLED... -> Link')
                },
              },
              {
                content: 'Code snippet',
                icon: 'code-snippet',
                onClick: () => writeLog('... -> Code snippet'),
              },
            ],
            menuOpen: moreMenuOpen,
            onMenuOpenChange: (e, { menuOpen }) => {
              writeLog(`setting menu to ${menuOpen ? 'open' : 'close'}`)
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
      <br />
      <button onClick={() => setLog([])}>Clear log</button>
      <pre>
        {log.map((e, i) => (
          <div key={i}>{e}</div>
        ))}
      </pre>
    </>
  )
}

export default ToolbarExampleShorthand
