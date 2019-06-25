import * as React from 'react'
import { Toolbar, Input, Button, Form } from '@stardust-ui/react'
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

  return (
    <>
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
          { key: 'outdent', icon: { name: 'outdent', outline: true } },
          { key: 'indent', icon: { name: 'indent', outline: true } },
          { key: 'bullets', icon: { name: 'bullets', outline: true } },
          { key: 'number-list', icon: { name: 'number-list', outline: true } },
          { key: 'divider3', kind: 'divider' },
          {
            key: 'more',
            icon: { name: 'more', outline: true },
            active: moreMenuOpen,
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
        ]}
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
