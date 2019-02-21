import { createComponent } from '@stardust-ui/react'
import * as React from 'react'

export interface MenuButtonWrapperProps {
  [p: string]: any

  children: React.ReactNode
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
  render: ({ children, stardust, ...rest }) => {
    const { classes } = stardust

    return (
      <div {...rest} className={classes.root}>
        {children}
      </div>
    )
  },
})

export default MenuButtonWrapper
