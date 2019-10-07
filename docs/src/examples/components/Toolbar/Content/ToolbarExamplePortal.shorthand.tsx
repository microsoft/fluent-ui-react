import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Button, Form, Input, Provider, themes, Toolbar, Text } from '@stardust-ui/react'
import * as _ from 'lodash'

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
  const [isBold, setBold] = React.useState(false)
  const [isItalic, setItalic] = React.useState(false)
  const [isUnderline, setUnderline] = React.useState(false)
  const [isStrike, setStrike] = React.useState(false)

  const [highlightOpen, setHighlightOpen] = React.useState(false)
  const [fontColorActive, setFontColorActive] = React.useState(false)

  const [moreMenuOpen, setMoreMenuOpen] = React.useState(false)

  const writeLog = message => {}

  const [bulletListActive, setBulletListActive] = React.useState(false)
  const [numberListActive, setNumberListActive] = React.useState(false)
  const [toDoListActive, setToDoListActive] = React.useState(false)

  return (
    <>
      <Toolbar
        overflow
        styles={{ margin: '50px', padding: '20px', border: '10px solid gray' }}
        items={[
          ..._.times(10, i => ({
            key: `generated${i}`,
            icon: 'bold',
          })),
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
            popup: {
              content: <Input icon="search" placeholder="Search..." />,
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
                'aria-label': 'bullet list',
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
                'aria-label': 'number list',
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
                'aria-label': 'to do list',
              },
            ],
          },
          { key: 'divider3', kind: 'divider' },
          { key: 'outdent', icon: { name: 'outdent', outline: true } },
          { key: 'indent', icon: { name: 'indent', outline: true } },
          { key: 'divider4', kind: 'divider' },
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
    </>
  )
}

const PortalWindow = ({ children, onClose }) => {
  const externalContainer = React.useRef(null)
  const externalWindow = React.useRef(null)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    externalWindow.current = window.open('', '', 'width=600,height=400,left=200,top=200')
    externalContainer.current = externalWindow.current.document.createElement('div')
    externalWindow.current.document.body.appendChild(externalContainer.current)
    if (onClose) externalWindow.current.onbeforeunload = onClose
    setMounted(true)
    return () => {
      externalWindow.current.close()
    }
  }, [])
  return (
    mounted &&
    ReactDOM.createPortal(
      children(externalContainer.current.ownerDocument),
      externalContainer.current,
    )
  )
}

const ProviderExampleTarget = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Text>This example will be removed before merge</Text>
      <Button onClick={() => setOpen(true)}>Open window!</Button>
      {open && (
        <PortalWindow onClose={() => setOpen(false)}>
          {externalDocument => (
            <Provider rtl theme={themes.teams} target={externalDocument}>
              {<ToolbarExampleShorthand />}
            </Provider>
          )}
        </PortalWindow>
      )}

      <ToolbarExampleShorthand />
    </>
  )
}

export default ProviderExampleTarget
