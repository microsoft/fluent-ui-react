import { createComponent } from '@stardust-ui/react'
import * as React from 'react'

export interface MenuButtonWrapperProps {
  children: React.ReactNode
  onKeyDown: (e: React.KeyboardEvent) => void
}

const menuButtonWrapperStyles = {
  boxSizing: 'border-box',
  display: 'inline-block',
}

const MenuButtonWrapper = createComponent<MenuButtonWrapperProps>({
  displayName: 'MenuButtonWrapper',
  defaultProps: {
    styles: menuButtonWrapperStyles,
  },
  render: ({ children, stardust, onKeyDown }) => {
    const { classes } = stardust

    return (
      <div className={classes.root} onKeyDown={onKeyDown}>
        {children}
      </div>
    )
  },
})

export default MenuButtonWrapper
