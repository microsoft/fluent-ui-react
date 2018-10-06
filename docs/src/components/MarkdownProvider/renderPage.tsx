import * as React from 'react'
import DocPage from 'docs/src/components/DocPage'

type MarkdownPage = {
  default: React.ComponentType<any>
  meta: {
    description?: string
    title: string
  }
}

const renderPage = (page: MarkdownPage) => () => {
  const { default: Component, meta } = page

  return (
    <DocPage {...meta}>
      <Component />
    </DocPage>
  )
}

export default renderPage
