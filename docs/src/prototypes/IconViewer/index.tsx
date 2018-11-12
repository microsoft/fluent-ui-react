import * as React from 'react'
import { Provider, Grid, Divider, Header, Icon } from '@stardust-ui/react'
import { processedIconsTheme } from 'src/themes/teams/iconTest'

const cellStyles = {
  margin: '10px 0',
}

class IconViewerExample extends React.Component<any, {}> {
  render() {
    return (
      <div style={{ margin: '20px' }}>
        <Header
          as="h3"
          content="Teams Icons viewer"
          description={{
            content:
              'These icons have been pulled directly from the Angular app and are ready to be added to the Teams theme in Stardust as needed',
            styles: { fontSize: '16px' },
          }}
        />
        <Provider theme={processedIconsTheme}>
          <Provider.Consumer
            render={theme => (
              <div>
                <div>
                  <Divider>
                    <Header as="h3" content="Regular" />
                  </Divider>
                  <Grid columns={4} style={{ textAlign: 'center' }}>
                    {Object.keys(theme.icons).map(name => (
                      <div key={name} style={cellStyles}>
                        <Icon name={name} />
                        <br />
                        <code>{name}</code>
                      </div>
                    ))}
                  </Grid>
                </div>
                <div>
                  <Divider>
                    <Header as="h3" content="Outline" />
                  </Divider>
                  <Grid columns={4} style={{ textAlign: 'center' }}>
                    {Object.keys(theme.icons).map(name => (
                      <div key={name + '-outline'} style={cellStyles}>
                        <Icon name={name} variables={{ outline: true }} />
                        <br />
                        <code>{name} outline</code>
                      </div>
                    ))}
                  </Grid>
                </div>
              </div>
            )}
          />
        </Provider>
      </div>
    )
  }
}

export default IconViewerExample
