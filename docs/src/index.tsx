import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

// TODO make themes a monorepo of packages
import { fontFaces, staticStyles, theme } from 'src/themes/teams'
import { Provider } from '@stardust-ui/react'

import Router from './routes'

// ----------------------------------------
// Rendering
// ----------------------------------------

const getUrlParams = (search = '') => {
  const hashes = search.slice(search.indexOf('?') + 1).split('&')
  return hashes.reduce((acc, hash) => {
    // eslint-disable-next-line
    const [key, val] = hash.split('=')
    return {
      ...acc,
      [key]: decodeURIComponent(val),
    }
  }, {})
}

const rtl = getUrlParams(window.location.search)['rtl'] === 'true'

const mountNode = document.createElement('div')
if (rtl) {
  mountNode.setAttribute('dir', 'rtl')
}
document.body.appendChild(mountNode)

const render = NewApp =>
  ReactDOM.render(
    <AppContainer>
      <Provider theme={{ ...theme, ...{ rtl } }} staticStyles={staticStyles} fontFaces={fontFaces}>
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
      const { scrollLeft, scrollTop } = document.scrollingElement
      ReactDOM.unmountComponentAtNode(mountNode)

      try {
        render(require('./routes').default)
        document.scrollingElement.scrollTop = scrollTop
        document.scrollingElement.scrollLeft = scrollLeft
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
