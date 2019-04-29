import * as React from 'react'
import { Header, Icon } from '@stardust-ui/react'

import CodeSnippet from '../components/CodeSnippet'
import DocPage from '../components/DocPage'
import GuidesNavigationFooter from '../components/GuidesNavigationFooter'

export default () => (
  <DocPage title="Quick Start">
    <Header as="h2">Install</Header>
    <p>
      Stardust UI should be installed as a <code>dependency</code> of your app.
    </p>
    <CodeSnippet mode="sh" value="yarn add @stardust-ui/react" />
    <Header as="h2">Setup</Header>
    <p>
      Stardust components are styled using CSS in JS. This technique requires a style renderer to
      render JavaScript objects to CSS.{' '}
      <a href="https://reactjs.org/docs/context.html" target="_blank" rel="noopener nofollow">
        React Context <Icon name="external" size="small" link fitted />
      </a>{' '}
      is used to provide the style renderer and theme to components.
    </p>
    <p>
      Place a <code>{'<Provider />'}</code> at the root of your app and pass theme as props.
    </p>
    <CodeSnippet
      label="index.jsx"
      value={`
        import React from 'react'
        import ReactDOM from 'react-dom'
        import { Provider, themes } from '@stardust-ui/react'

        import App from './App'

        ReactDOM.render(
          <Provider theme={themes.teams}>
            <App />
          </Provider>,
          document.getElementById('root'),
        )
      `}
    />
    <Header as="h2">Usage</Header>
    <p>That's it. You can now use Stardust UI components in your app.</p>
    <CodeSnippet
      label="App.jsx"
      value={`
        import React from 'react'
        import { Button } from '@stardust-ui/react'

        export default () => <Button content="Theming" icon="arrow right" iconPosition="after" primary />
      `}
    />

    <GuidesNavigationFooter next={{ name: 'FAQ', url: 'faq' }} />
  </DocPage>
)
