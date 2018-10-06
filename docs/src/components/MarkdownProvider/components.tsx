import _ from 'lodash'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '@stardust-ui/react'

import CodeSnippet from 'docs/src/components/CodeSnippet'

// Heads up!
// These functions are only component's mapping.

const a = ({ children, href }) => {
  const isExternal = _.startsWith(href, 'http://') || _.startsWith(href, 'https://')

  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link to={href}>{children}</Link>
  )
}

const code = ({ className, children, label }) => {
  const mode = className && _.replace(className, 'language-', '')
  const value = _.trim(children)

  return <CodeSnippet label={label} mode={mode} value={value} />
}

const h1 = ({ children }) => <Header as="h1" content={children} />

const h2 = ({ children }) => <Header as="h2" content={children} />

export default {
  a,
  code,
  h1,
  h2,
}
