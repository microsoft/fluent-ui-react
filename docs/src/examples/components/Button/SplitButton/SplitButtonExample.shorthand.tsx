import * as React from 'react'
import { SplitButton } from '@stardust-ui/react'

const handleMainOptionClick = e => {
  alert('PDF is all around us!')
}
const items = [
  {
    content: 'Export to PDF',
    icon: 'files-pdf',
    onClick: handleMainOptionClick,
  },
  {
    content: 'Export to PDS',
    icon: 'files-photoshop',
    onClick: e => {
      alert('Photoshop is awesone!')
    },
  },
  {
    content: 'Export as GIF',
    icon: 'files-gif',
    disabled: true,
  },
  {
    content: 'Export to EPS',
    icon: 'files-illustrator',
    onClick: e => {
      alert('Illustrator is kinda cool!')
    },
  },
]

const SplitButtonExampleShorthand = () => (
  <SplitButton
    onClick={handleMainOptionClick}
    menuButton={{ menu: { items } }}
    button={items[0].content}
  />
)

export default SplitButtonExampleShorthand
