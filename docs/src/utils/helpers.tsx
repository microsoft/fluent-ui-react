import * as React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@stardust-ui/react'

export const code = value => <code>{value}</code>

export const link = (content, href, isExternal = false) =>
  isExternal ? (
    <a href={href} target="blank">
      {content} {isExternal ? <Icon name="external" size="small" /> : ''}
    </a>
  ) : (
    <Link to={href}>{content}</Link>
  )
