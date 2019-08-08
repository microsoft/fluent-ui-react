import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider, themes } from '@stardust-ui/react'

import { mergeThemes } from 'src/lib'
import Routes from './routes'
import { PerfDataProvider } from './components/ComponentDoc/PerfChart'

function App() {
  return (
    <Provider
      as={React.Fragment}
      theme={mergeThemes(themes.fontAwesome, themes.teams, {
        staticStyles: [
          {
            a: {
              textDecoration: 'none',
            },
          },
        ],
      })}
    >
      <PerfDataProvider>
        <Routes />
      </PerfDataProvider>
    </Provider>
  )
}

export default hot(App)
