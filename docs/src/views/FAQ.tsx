import * as React from 'react'
import DocPage from '../components/DocPage/DocPage'
import GuidesNavigationFooter from '../components/GuidesNavigationFooter'
import CodeSnippet from '../components/CodeSnippet'
import { link } from '../utils/helpers'

import { Header } from '@stardust-ui/react'

const Category = props => <Header as="h2" {...props} />
const Question = props => <Header as="h3" {...props} />
const Answer = props => <p>{props.content}</p>

export default () => (
  <DocPage title="FAQ">
    <Category content="General" />
    <Question content="Does Stardust support mobile?" />
    <Answer content="No. Scope is limited to Web / Desktop at present." />

    <Question content="How can @mixins be used in the Stardust's styles" />
    <Answer
      content="
      As the styles in Stardust are defined using CSS in JS, mixins can be defined as simple
      functions that can be reused on multiple places.
      "
    />

    <Question content="How to use Links and React-Router" />
    <Answer
      content={
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
      }
    />

    <Category content="Teams Specific" />
    <Question content="How to add Icons to Stardust" />
    <Answer
      content={
        <p>
          Generally Teams should be using SVG icons only. If you need FontAwesome or other icons,
          process for adding them is described in{' '}
          {link(
            'Issue 585',
            'https://github.com/stardust-ui/react/pull/585',
            true, // if 'true', opens in a new tab
          )}
        </p>
      }
    />
    <GuidesNavigationFooter
      previous={{ name: 'Quick Start', url: 'quick-start' }}
      next={{ name: 'Accessibility', url: 'accessibility' }}
    />
  </DocPage>
)
