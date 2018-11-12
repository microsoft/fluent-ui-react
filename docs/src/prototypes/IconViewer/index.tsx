import * as React from 'react'
import { Provider, Grid, Header, Icon } from '@stardust-ui/react'
import { processedIconsTheme } from 'src/themes/teams/iconTest'

class IconViewerExample extends React.Component<any, {}> {
  render() {
    return (
      <div style={{ margin: '20px' }}>
        <Header
          as="h3"
          content="Teams Icons viewer"
          description={{
            content:
              'These icons have been pulled directly from the Angular app and are ready to be added to the Stardust repo as needed',
            styles: { fontSize: '16px' },
          }}
        />
        <Provider theme={processedIconsTheme}>
          <Provider.Consumer
            render={theme => (
              <Grid columns={4} style={{ textAlign: 'center' }}>
                {Object.keys(theme.icons).map(name => (
                  <span key={name}>
                    <Icon name={name} />
                    <br />
                    <code>{name}</code>
                  </span>
                ))}
              </Grid>
            )}
          />
        </Provider>
      </div>
    )
  }
}

export default IconViewerExample
