import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Header, Icon } from 'semantic-ui-react'

import { Button } from '@stardust-ui/react'

import CodeSnippet from '../components/CodeSnippet'
import DocPage from '../components/DocPage'

export default () => (
  <DocPage title="Quick Start">
    <Header as="h2">Install</Header>
    <p>
      Stardust UI should be installed as a <code>dependency</code> of your app.
    </p>
    <CodeSnippet mode="sh" value="yarn install @stardust-ui/react" />
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
      value={[
        `import React from 'react'`,
        `import ReactDOM from 'react-dom'`,
        `import { Provider } from '@stardust-ui/react'`,
        `import { fontFaces, staticStyles, theme } from '@stardust-ui/react/themes/teams'`,
        ``,
        `import App from './App'`,
        ``,
        `ReactDOM.render(`,
        `  <Provider theme={theme} staticStyles={staticStyles} fontFaces={fontFaces}>`,
        `    <App />`,
        `  </Provider>,`,
        `  document.getElementById('root'),`,
        `)`,
      ].join('\n')}
    />
    <Header as="h2">Usage</Header>
    <p>That's it. You can now use Stardust UI components in your app.</p>
    <CodeSnippet
      label="App.jsx"
      value={[
        `import React from 'react'`,
        `import { Button } from '@stardust-ui/react'`,
        ``,
        `export default () => (`,
        `  <Button type="primary" content="Docs" icon="arrow right" iconPosition="after" />`,
        `)`,
      ].join('\n')}
    />
    <br />
    {/* Show a preview of the above snippet */}
    <Button
      as={NavLink}
      content="Docs"
      type="primary"
      icon="arrow right"
      iconPosition="after"
      to="components/button"
    />
  </DocPage>
)
