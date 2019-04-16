import * as React from 'react'
import DocPage from '../components/DocPage/DocPage'
import GuidesNavigationFooter from '../components/GuidesNavigationFooter'
import CodeSnippet from '../components/CodeSnippet'

import { Header } from '@stardust-ui/react'

export default () => (
  <DocPage title="FAQ">
    <Header as="h2" content="General" />
    <Header as="h3" content="Does Stardust support mobile?" />
    <p>No. Scope is limited to Web / Desktop at present.</p>

    <Header as="h3" content="How can @mixins be used in the Stardust's styles" />
    <p>
      As the styles in Stardust are defined using CSS in JS, mixins can be defined as simple
      functions that can be reused on multiple places.
    </p>

    <Header as="h3" content="Links and React-Router" />
    <p>
      We recommend to render links from react router as Buttons as below:
      <CodeSnippet
        value={`
      <>
          import { Link } from 'react-router-dom'
          
          <Button
            as={Link}
            content={previous.name}
            icon="arrow left"
            iconPosition="before"
            primary
            to={previous.url}
          />
      </>
      `}
      />
    </p>

    <Header as="h2" content="Teams Specific" />
    <Header as="h3" content="Adding Icons to Stardust" />

    <p>
      Generally Teams should be using SVG icons only. If you need FontAwesome or other icons,
      process for adding them is described in{' '}
      <a href="https://github.com/stardust-ui/react/pull/585">Issue 585</a>
    </p>

    <GuidesNavigationFooter
      previous={{ name: 'Quick Start', url: 'quick-start' }}
      next={{ name: 'Accessibility', url: 'accessibility' }}
    />
  </DocPage>
)
