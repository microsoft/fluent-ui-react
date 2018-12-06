import * as React from 'react'
import { Provider, Grid, Divider, Header, Icon } from '@stardust-ui/react'
import themeWithProcessedIcons from 'src/themes/teams/withProcessedIcons'
import { TeamsProcessedSvgIconSpec } from 'src/themes/teams/components/Icon/svg/types'

import { Menu } from 'semantic-ui-react'

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

        <div>
          <Menu pointing tabular>
            {Object.keys(this.iconFilters).map(filterName => (
              <Menu.Item
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
                    <Divider>
                      <Header as="h3" content="Regular" />
                    </Divider>
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
                      <Header as="h3" content="Outline" />
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
      </div>
    )
  }
}

export default IconViewerExample
