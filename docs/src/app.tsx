import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider, themes } from '@stardust-ui/react'

import { mergeThemes } from 'src/lib'
import { ThemeContext, ThemeContextData, themeContextDefaults } from './context/ThemeContext'
import Routes from './routes'
import { PerfDataProvider } from './components/ComponentDoc/PerfChart'

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
          as={React.Fragment}
          theme={mergeThemes(themes[themeName], {
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
      </ThemeContext.Provider>
    )
  }
}

export default hot(App)
