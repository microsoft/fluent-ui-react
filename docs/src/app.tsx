import * as React from 'react'
import { hot } from 'react-hot-loader/root'

import { ThemeContextData, themeContextDefaults } from './context/ThemeContext'
import Routes from './routes'

// Experimental dev-time accessibility attributes integrity validation.
import { setup } from '@fluentui/ability-attributes'

// Temporarily disabling the validation for Screener.
if (process.env.NODE_ENV !== 'production' && !process.env.SCREENER) {
  setup()
}

class App extends React.Component<any, ThemeContextData> {
  // State also contains the updater function so it will
  // be passed down into the context provider
  state: ThemeContextData = {
    ...themeContextDefaults,
    changeTheme: (e, { value: item }) => this.setState({ themeName: item.value }),
  }

  render() {
    return <Routes />
  }
}

export default hot(App)
