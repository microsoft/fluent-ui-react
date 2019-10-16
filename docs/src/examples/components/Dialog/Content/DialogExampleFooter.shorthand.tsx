import { Button, Dialog, Box } from '@stardust-ui/react'
import * as React from 'react'

const customStylesWithComponent = compStyles => {
  const customStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  }
  return { ...customStyles, ...compStyles }
}

const CustomFooter = ({ styles, actions }) => {
  return (
    <Box styles={customStylesWithComponent(styles())}>
      <span>any custom text in footer</span>
      {actions}
    </Box>
  )
}

const DialogExampleContent: React.FC = () => (
  <Dialog
    cancelButton="Cancel"
    confirmButton="Confirm"
    content="Are you sure you want to confirm this action?"
    header="Action confirmation"
    trigger={<Button content="Open a dialog" />}
    footer={render => render({}, (C, p) => <CustomFooter {...p} />)}
  />
)

export default DialogExampleFooter
