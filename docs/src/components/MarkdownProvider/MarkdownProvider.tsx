import * as React from 'react'
import { MDXProvider } from '@mdx-js/tag'

import components from './components'

const MarkdownProvider = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)

export default MarkdownProvider
