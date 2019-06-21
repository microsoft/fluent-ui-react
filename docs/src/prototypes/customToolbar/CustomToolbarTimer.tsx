import * as React from 'react'
import { createComponent } from '@stardust-ui/react'

const CustomToolbarTimer = createComponent({
  displayName: 'CustomToolbarTimer',
  render: ({ children, stardust, ...rest }) => {
    const { classes } = stardust

    return (
      <span {...rest} className={classes.root} data-is-focusable={true}>
        {children}
      </span>
    )
  },
})

export default CustomToolbarTimer
