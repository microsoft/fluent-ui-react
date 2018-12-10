import * as React from 'react'
import { Provider, Grid, Divider, Header, Icon } from '@stardust-ui/react'
import themeWithProcessedIcons from 'src/themes/teams/withProcessedIcons'
import { TeamsProcessedSvgIconSpec } from 'src/themes/teams/components/Icon/svg/types'

import { Menu, Segment } from 'semantic-ui-react'

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
  private readonly iconFilters = {
    All: () => true,
    Exported: (icon: TeamsProcessedSvgIconSpec) => icon.exportedAs,
    'Not Exported': (icon: TeamsProcessedSvgIconSpec) => !icon.exportedAs,
  }

  state = {
    filter: 'All',
  }

  applyCurrentFilter(icon) {
    const currentFilter = this.iconFilters[this.state.filter]
    return currentFilter(icon)
  }

  render() {
    return (
      <Segment styles={{ padding: '30px' }}>
        <Header
          as="h3"
          content="Teams Icons"
          description={{
            content:
              'These icons have been pulled directly from the Angular app and are ready to be added to the Teams theme in Stardust as needed.',
            styles: { fontSize: '16px' },
          }}
        />

        <div style={{ marginTop: '15px' }}>
          <Menu tabular style={{ margin: '15px 0' }}>
            {Object.keys(this.iconFilters).map(filterName => (
              <Menu.Item
                key={filterName}
                name={filterName}
                active={this.state.filter === filterName}
                onClick={() => this.setState({ filter: filterName })}
              />
            ))}
          </Menu>

          <Provider theme={themeWithProcessedIcons}>
            <Provider.Consumer
              render={theme => (
                <div>
                  <div>
                    <Header as="h3" content="Regular" textAlign="center" />
                    <Grid columns={4} style={{ textAlign: 'center' }}>
                      {Object.keys(theme.icons)
                        .filter(name => name.startsWith(processedIconsNamePrefix))
                        .filter(name => this.applyCurrentFilter(theme.icons[name]))
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
                      <Header as="h3" content="Outline" textAlign="center" />
                    </Divider>
                    <Grid columns={4} style={{ textAlign: 'center' }}>
                      {Object.keys(theme.icons)
                        .filter(name => name.startsWith(processedIconsNamePrefix))
                        .filter(name => this.applyCurrentFilter(theme.icons[name]))
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
      </Segment>
    )
  }
}

export default IconViewerExample
