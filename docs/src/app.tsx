import * as React from 'react'
import * as _ from 'lodash'
import { Provider, themes } from '@stardust-ui/react'

import { mergeThemes } from 'src/lib'
import { ThemeContext, ThemeContextData, themeContextDefaults } from './context/ThemeContext'
import Router from './routes'

class App extends React.Component<any, ThemeContextData> {
  // State also contains the updater function so it will
  // be passed down into the context provider
  state: ThemeContextData = {
    ...themeContextDefaults,
    changeTheme: (e, { value: item }) => this.setState({ themeName: item.value }),
  }

  render() {
    const { themeName } = this.state
    return (
      <ThemeContext.Provider value={this.state}>
        <Provider
          theme={mergeThemes(themes[themeName], {
            // adjust Teams' theme to Semantic UI's font size scheme
            staticStyles: [
              {
                a: {
                  textDecoration: 'none',
                },
                html: {
                  fontSize: '14px',
                },
                body: {
                  fontSize: '1rem',
                },
              },
            ],
          })}
        >
          <Router />
        </Provider>
      </ThemeContext.Provider>
    )
  }
}

export default App
