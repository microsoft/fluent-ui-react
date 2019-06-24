import * as React from 'react'
import DocumentTitle from 'react-document-title'
import { Header } from '@stardust-ui/react'

interface DocPageProps {
  title: string
  description?: string
  children: React.ReactNode
}

const DocPage = ({ title, description, children }: DocPageProps) => (
  <DocumentTitle title={`Stardust - ${title}`}>
    <div style={{ padding: '18px 32px', maxWidth: '80vw' }}>
      <Header
        className="sd_docPageTitle"
        as="h1"
        aria-level={2}
        content={title}
        description={description}
        textAlign="center"
      />
      {children}
    </div>
  </DocumentTitle>
)

export default DocPage
