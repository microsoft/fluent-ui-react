import * as React from 'react'
// TODO: import { createComponent } from '@stardust-ui/react'
import createComponent from '../../lib/createStardustComponent'

import AppLayoutArea, { AppLayoutAreaProps } from './AppLayoutArea'

export interface AppLayoutProps {
  debug?: boolean
  gap?: string
  slots?: {
    [key: string]: AppLayoutAreaProps
    header?: AppLayoutAreaProps
    nav?: AppLayoutAreaProps
    full?: AppLayoutAreaProps
    tile?: AppLayoutAreaProps
    start?: AppLayoutAreaProps
    content?: AppLayoutAreaProps
    end?: AppLayoutAreaProps
  }
  template?: string
}

const getSlotOrder = template =>
  template
    .split('\n')
    .filter(s => s.includes('"') && s.trim())
    .map(s => s.match(/"(.*)"/)[1])
    .join(' ')
    .split(/ +/)
    .reduce((acc: string[], next: string) => {
      if (acc.indexOf(next) === -1) acc.push(next)
      return acc
    }, [])

const AppLayout = createComponent<AppLayoutProps>({
  displayName: 'AppLayout',

  render({ stardust, ...props }) {
    const { classes } = stardust
    const { debug, slots, template } = props

    return (
      <div className={classes.root}>
        {getSlotOrder(template).map(k => {
          const v = slots[k]

          return <AppLayoutArea debug={debug} key={k} area={k} {...v} />
        })}
      </div>
    )
  },
})

export default AppLayout
