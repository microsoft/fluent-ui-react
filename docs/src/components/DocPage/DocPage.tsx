import * as React from 'react'
import DocumentTitle from 'react-document-title'
import { Header } from '@stardust-ui/react'

interface IDocPageProps {
  title: string
  description?: string
  children: React.ReactNode
}

const DocPage = ({ title, description, children }: IDocPageProps) => (
  <DocumentTitle title={'Stardust - ' + title}>
    <div style={{ padding: '2rem', fontSize: '1.15rem', maxWidth: '80ch' }}>
      <Header as="h1" content={title} description={description} textAlign="center" />
      {children}
    </div>
  </DocumentTitle>
)

export default DocPage
