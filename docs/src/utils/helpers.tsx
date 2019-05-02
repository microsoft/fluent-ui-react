import * as React from 'react'
import { Icon } from '@stardust-ui/react'

export const code = value => <code>{value}</code>

export const link = (content, href, isExternal = false) => (
  <a href={href} {...isExternal && { target: 'blank' }}>
    {content} {isExternal ? <Icon name="external" size="small" /> : ''}
  </a>
)
