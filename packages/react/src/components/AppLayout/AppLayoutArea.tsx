import * as React from 'react'
// TODO: import { createComponent } from '@stardust-ui/react'
import createComponent from '../../lib/createStardustComponent'

export interface AppLayoutAreaProps {
  area?: string
  content?: React.ReactNode | React.ReactNodeArray
  debug?: boolean
}

const AppLayoutArea = createComponent<AppLayoutAreaProps>({
  displayName: 'AppLayoutArea',

  render({ stardust, ...props }) {
    const { classes } = stardust
    const { content } = props

    return <div className={classes.root}>{content}</div>
  },
})

export default AppLayoutArea
