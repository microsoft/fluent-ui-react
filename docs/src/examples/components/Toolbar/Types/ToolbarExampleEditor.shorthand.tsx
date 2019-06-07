import * as React from 'react'
import { Toolbar } from '@stardust-ui/react'

const ToolbarExampleShorthand = () => {
  const [isBold, setBold] = React.useState(true)
  const [isItalic, setItalic] = React.useState(false)
  const [isUnderline, setUnderline] = React.useState(false)
  const [isStrike, setStrike] = React.useState(false)

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
        { key: 'highlight', icon: { name: 'highlight', outline: true } },
        { key: 'font-color', icon: { name: 'font-color', outline: true } },
        { key: 'font-size', icon: { name: 'font-size', outline: true } },
        { key: 'remove-format', icon: { name: 'remove-format', outline: true } },
        { key: 'divider2', kind: 'divider' },
        { key: 'outdent', icon: { name: 'outdent', outline: true } },
        { key: 'indent', icon: { name: 'indent', outline: true } },
        { key: 'bullets', icon: { name: 'bullets', outline: true } },
        { key: 'number-list', icon: { name: 'number-list', outline: true } },
        { key: 'divider3', kind: 'divider' },
        { key: 'more', icon: { name: 'more', outline: true } },
      ]}
    />
  )
}

export default ToolbarExampleShorthand
