import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

// TODO make themes a monorepo of packages
import { Provider, themes } from '@stardust-ui/react'

import Router from './routes'
import { mergeThemes } from '../../src/lib'

// ----------------------------------------
// Rendering
// ----------------------------------------

const mountNode = document.createElement('div')
document.body.appendChild(mountNode)

const render = NewApp =>
  ReactDOM.render(
    <AppContainer>
      <Provider
        theme={mergeThemes(themes.teams, {
          // adjust Teams' theme to Semantic UI's font size scheme
          siteVariables: {
            htmlFontSize: '14px',
            bodyFontSize: '1rem',
          },
        })}
      >
        <NewApp />
      </Provider>
    </AppContainer>,
    mountNode,
  )

// ----------------------------------------
// HMR
// ----------------------------------------

if (__DEV__) {
  // When the application source code changes, re-render the whole thing.
  if (module.hot) {
    module.hot.accept('./routes', () => {
      // restore scroll
      const { scrollLeft, scrollTop } = document.scrollingElement!
      ReactDOM.unmountComponentAtNode(mountNode)

      try {
        render(require('./routes').default)
        document.scrollingElement!.scrollTop = scrollTop
        document.scrollingElement!.scrollLeft = scrollLeft
      } catch (e) {
        console.error(e)
      }
    })
  }
}

// ----------------------------------------
// Start the app
// ----------------------------------------

render(Router)
