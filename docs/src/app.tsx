import * as React from 'react'
import { Provider, themes } from '@stardust-ui/react'

import { mergeThemes } from '../../src/lib'
import { ThemeContext } from './context/ThemeContext'
import Router from './routes'

interface AppState {
  themeName: string
  changeTheme: (e, p) => void
}

class App extends React.Component<any, AppState> {
  private changeTheme

  constructor(props) {
    super(props)

    this.changeTheme = (e, p) => {
      this.setState({
        themeName: p.value,
      })
    }

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      themeName: 'teams',
      changeTheme: this.changeTheme,
    }
  }

  private docsTheme = {
    // adjust Teams' theme to Semantic UI's font size scheme
    siteVariables: {
      htmlFontSize: '16px',
      bodyFontSize: '1rem',
      fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
    },
    componentStyles: {
      Header: {
        root: {
          fontWeight: 700,
        },
      },
      Grid: {
        root: {
          gridColumnGap: '1rem',
          gridRowGap: '1rem',
        },
      },
      Button: {
        root: {
          textDecoration: 'none',
          padding: '5px 20px',
        },
      },
    },
    staticStyles: [
      {
        h1: {
          fontSize: '28px',
          marginTop: '-4px',
        },
        h2: {
          fontSize: '24px',
          marginBottom: '14px',
          marginTop: '24.5714px',
        },
        a: {
          color: '#4183c4',
          textDecoration: 'none',
          ':hover, :focus': {
            color: '#1e70bf',
          },
        },
      },
    ],
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <Provider theme={mergeThemes(themes.teams, this.docsTheme)}>
          <Router />
        </Provider>
      </ThemeContext.Provider>
    )
  }
}

export default App
