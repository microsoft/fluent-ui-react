import { MDXProvider } from '@mdx-js/react'
import { CodeSnippet } from '@stardust-ui/docs-components'
import { Header } from '@stardust-ui/react'
import * as React from 'react'
import { RouteProps } from 'react-router'

import DocsLayout from 'docs/src/components/DocsLayout'
import { link } from 'docs/src/utils/helpers'
import DocPage from 'docs/src/components/DocPage'

type MarkdownPageProps = {
  page: {
    default: React.ComponentType<any>
    meta: {
      title: string
    }
  }
} & RouteProps

const components = {
  a: ({ children, href }) => link(children, href),
  code: ({ className, children, fitted, label }) => (
    <CodeSnippet
      fitted={fitted}
      mode={className.replace('language-', '')}
      label={label}
      value={children}
    />
  ),
  h1: ({ children }) => <Header as="h1" content={children} />,
  h2: ({ children }) => <Header as="h2" content={children} />,
  h3: ({ children }) => <Header as="h3" content={children} />,
}

const MarkdownPage: React.FunctionComponent<MarkdownPageProps> = props => {
  const { page, ...rest } = props
  const { default: Component, meta } = page

  return (
    <DocsLayout
      {...rest}
      render={() => (
        <DocPage title={meta.title}>
          <MDXProvider components={components}>
            <Component />
          </MDXProvider>
        </DocPage>
      )}
    />
  )
}

export default MarkdownPage
