import * as React from 'react'
import DocPage from '../components/DocPage/DocPage'
import GuidesNavigationFooter from '../components/GuidesNavigationFooter'
import { link } from '../utils/helpers'

import { CodeSnippet } from '@stardust-ui/docs-components'
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
          We recommend to render links from React Router as Buttons as below:
          <CodeSnippet
            value={`
            import { Link } from 'react-router-dom'

            <Button as={Link} content={previous.name} to={previous.url} />
          `}
          />
        </p>
      }
    />

    <Question content="How can I set default value of Form.Field?" />
    <Answer
      content={
        <p>
          You need to set the default value on the input slot.
          <CodeSnippet
            value={`
      <Form.Field control={{as: Input, defaultValue:'some value'}} />
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
          {link('Issue 585', 'https://github.com/stardust-ui/react/pull/585')}
        </p>
      }
    />
    <Question content="How can I reset or replace existing fonts?" />
    <Answer
      content={
        <>
          <p>As each theme is reqular JS object you can reassign properties:</p>
          <CodeSnippet
            mode="js"
            value={`
              import { themes } from '@stardust-ui/react'

              // 💡 Your overrides should be defined before rendering any Stardust components

              // will remove all existing fontFaces
              themes.teams.fontFaces = []
              // will replace with own definitions
              themes.teams.fontFaces = [{
                name: 'Segoe UI',
                paths: ['https://...'],
                style: { fontWeight: 600 },
              }]
         `}
          />
        </>
      }
    />
    <GuidesNavigationFooter
      previous={{ name: 'Quick Start', url: 'quick-start' }}
      next={{ name: 'Accessibility', url: 'accessibility' }}
    />
  </DocPage>
)
