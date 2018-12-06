import * as React from 'react'
import { Provider, Grid, Divider, Header, Icon } from '@stardust-ui/react'
import themeWithProcessedIcons from 'src/themes/teams/withProcessedIcons'

const cellStyles = {
  margin: '10px 0',
}

const processedIconsNamePrefix = 'processedIcons_'

const renderStardustIconName = (icon, isOutline = false) => {
  const maybeExportedAs = (icon as any).exportedAs
  return (
    maybeExportedAs && (
      <code style={{ color: 'red' }}>
        => {maybeExportedAs} {isOutline && 'outline'}
      </code>
    )
  )
}

class IconViewerExample extends React.Component<any, {}> {
  render() {
    return (
      <div style={{ margin: '20px' }}>
        <Header
          as="h3"
          content="Teams Icons"
          description={{
            content:
              'These icons have been pulled directly from the Angular app and are ready to be added to the Teams theme in Stardust as needed.',
            styles: { fontSize: '16px' },
          }}
        />
        <Provider theme={themeWithProcessedIcons}>
          <Provider.Consumer
            render={theme => (
              <div>
                <div>
                  <Divider>
                    <Header as="h3" content="Regular" />
                  </Divider>
                  <Grid columns={4} style={{ textAlign: 'center' }}>
                    {Object.keys(theme.icons)
                      .filter(name => name.startsWith(processedIconsNamePrefix))
                      .sort()
                      .map(name => (
                        <div key={name} style={cellStyles}>
                          <Icon name={name} />
                          <br />
                          <code>{name.replace(processedIconsNamePrefix, '')}</code>
                          <br />
                          {renderStardustIconName(theme.icons[name])}
                        </div>
                      ))}
                  </Grid>
                </div>
                <div>
                  <Divider>
                    <Header as="h3" content="Outline" />
                  </Divider>
                  <Grid columns={4} style={{ textAlign: 'center' }}>
                    {Object.keys(theme.icons)
                      .filter(name => name.startsWith(processedIconsNamePrefix))
                      .sort()
                      .map(name => (
                        <div key={`${name}-outline`} style={cellStyles}>
                          <Icon name={name} variables={{ outline: true }} />
                          <br />
                          <code>{name.replace(processedIconsNamePrefix, '')} outline</code>
                          <br />
                          {renderStardustIconName(theme.icons[name], /* isOutline */ true)}
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
