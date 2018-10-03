import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'

// ----------------------------------------
// Rendering
// ----------------------------------------

const mountNode = document.createElement('div')
document.body.appendChild(mountNode)

const render = NewApp =>
  ReactDOM.render(
    <AppContainer>
      <NewApp />
    </AppContainer>,
    mountNode,
  )

// ----------------------------------------
// HMR
// ----------------------------------------

if (__DEV__) {
  // When the application source code changes, re-render the whole thing.
  if (module.hot) {
    module.hot.accept('./app', () => {
      // restore scroll
      const { scrollLeft, scrollTop } = document.scrollingElement!
      ReactDOM.unmountComponentAtNode(mountNode)

      try {
        render(require('./app').default)
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

render(App)
