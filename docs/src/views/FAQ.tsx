import * as React from 'react'
import DocPage from '../components/DocPage/DocPage'
import GuidesNavigationFooter from '../components/GuidesNavigationFooter'
import { link, code } from '../utils/helpers'

import { CodeSnippet } from '@stardust-ui/docs-components'
import { Header } from '@stardust-ui/react'

const Category = props => <Header as="h2" {...props} />
const Question = props => <Header as="h3" {...props} />
const Answer = props => <p>{props.content}</p>

export default () => (
  <DocPage title="FAQ">
    <Header as="h2" content="Content" />
    <ul>
      <li>
        {link('General', '#General')}
        <ul>
          <li>{link('Does Stardust support mobile?', '#does-stardust-support-mobile')}</li>
          <li>
            {link(
              "How can @mixins be used in the Stardust's styles?",
              '#how-can-mixins-be-used-in-the-stardusts-styles',
            )}
          </li>
          <li>
            {link('How to use Links and React-Router?', '#how-to-use-links-and-react-router')}
          </li>
          <li>
            {link(
              'How can I set default value of Form.Field?',
              '#how-can-i-set-default-value-of-form-field',
            )}
          </li>
          <li>
            {link(
              'Is there an onLoad or equivalent event for Image components so I can run a function after an image loads?',
              '#is-there-an-onload-or-equivalent-event-for-image-components-so-i',
            )}
          </li>
          <li>
            {link(
              "What's the difference between Flex, Grid, Layout, Box and Segment components?",
              '#whats-the-difference-between-flex-grid-layout-box-and-segment-co',
            )}
          </li>
        </ul>
      </li>
      <li>
        {link('Teams Specific', '#teams-specific')}
        <ul>
          <li>{link('How to add Icons to Stardust?', '#how-to-add-icons-to-stardust')}</li>
        </ul>
      </li>
    </ul>

    <Category content="General" />
    <Question content="Does Stardust support mobile?" />
    <Answer content="No. Scope is limited to Web / Desktop at present." />

    <Question content="How can @mixins be used in the Stardust's styles" />
    <Answer
      content={
        <p>
          As the styles in Stardust are defined using CSS in JS, mixins can be defined as simple
          functions that can be reused on multiple places.
          <br />
          For example, in Stardust the method 'getBorderFocusStyles' is re-used multiple times in
          many component styles.
        </p>
      }
    />

    <Question content="How to use Links and React-Router?" />
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
          You need to set the default value on the component used in the control slot.
          <CodeSnippet
            value={`
            <Form.Field control={{as: Input, defaultValue:'some value'}} />
            `}
          />
        </p>
      }
    />

    <Question content="Is there an onLoad or equivalent event for Image components so i can run a function after an image loads?" />
    <Answer
      content={
        <p>
          Just as with vanilla React, all HTML props are supported on all Stardust components. Just
          pass onLoad or onError to the component you want to put the prop on.
          <CodeSnippet
            value={`
            <Image src="//placehold.it/300" onLoad={() => alert('Loaded')} onError={() => alert('Error')} />
            `}
          />
        </p>
      }
    />

    <Question>
      What's the difference between {code('Flex')}, {code('Grid')}, {code('Layout')}, {code('Box')}{' '}
      and {code('Segment')} components?
    </Question>
    <Answer
      content={
        <div>
          <p>
            {code('Flex')}, {code('Grid')} and {code('Layout')} components handle layout aspects.
            The {code('Flex')} component is for laying out items in one direction, while the{' '}
            {code('Grid')} component is made for two dimensional layouts. Visit the{' '}
            {link('Layout guide', '/layout')} page for a detailed comparison between {code('Flex')}
            and {code('Grid')}.
          </p>
          <p>
            The {code('Layout')} component is now deprecated. Its purpose was arrangement of the
            content of a component. {code('Flex')} or {code('Grid')} component should be used
            instead of the {code('Layout')}
            component.
          </p>
          <p>
            {code('Box')} is a utility component that is often used by Stardust to implement
            higher-level components. By default, it renders styled {code('div')} element.
          </p>
          <p>
            The cases when client might want to use it are very exceptional, and all are about
            applying custom styles to rendered {code('div')} element. However, more robust approach
            that won't break theming consistency is to instead create a custom component and define
            related styles as part of a theme. Visit{' '}
            {link('Integrate Custom Components', '/integrate-custom-components')}
            page to see how this can be done.
          </p>
          <p>
            {link('Segment', '/components/segment')} groups related content together. It shouldn't
            be used to handle layout aspects.
          </p>
        </div>
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
