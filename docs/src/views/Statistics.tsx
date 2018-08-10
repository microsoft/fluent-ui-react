import * as _ from 'lodash'
import * as React from 'react'
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Label,
  Message,
  Popup,
  Segment,
  Statistic,
  Table,
} from 'semantic-ui-react'

import { componentInfo } from '../utils'

const componentCount = componentInfo.all.length
const parentCount = componentInfo.parents.length
const childCount = componentCount - parentCount

interface IPropStat {
  name: string
  componentCount: number
  componentCoverage: number
  isGlobal: boolean
  isUnique: boolean
  isShared: boolean
  components: {
    displayName: string
    description: string[]
  }[]
}

type PropStats = IPropStat[]

const propStats = componentInfo.all.reduce<PropStats>((stats, currentInfo) => {
  _.forEach(currentInfo.props, currentProp => {
    const name = currentProp.name

    // don't add duplicate prop stat objects
    if (_.find(stats, { name })) return stats

    const componentsWithProp = componentInfo.all.filter(({ props }) => _.some(props, { name }))

    const isGlobal = componentsWithProp.length === componentInfo.all.length
    const isUnique = componentsWithProp.length === 1
    const isShared = !isGlobal && !isUnique

    stats.push({
      name,

      componentCount: componentsWithProp.length,

      componentCoverage: componentsWithProp.length / componentInfo.all.length * 100,

      components: componentsWithProp.map(({ displayName, props }) => ({
        displayName,
        description: _.find(props, { name }).description,
      })),

      isGlobal,

      isUnique,

      isShared,
    })
  })

  return stats
}, [])

const { globalProps, sharedProps, uniqueProps } = _.reduce(
  propStats,
  (acc, propStat) => {
    if (propStat.isGlobal) acc.globalProps.push(propStat)
    if (propStat.isUnique) acc.uniqueProps.push(propStat)
    if (propStat.isShared) acc.sharedProps.push(propStat)

    return acc
  },
  { globalProps: [], sharedProps: [], uniqueProps: [] },
)

const totalPropCount = propStats.length
const globalPropsCount = globalProps.length
const sharedPropsCount = sharedProps.length
const uniquePropsCount = uniqueProps.length

const componentNameWidth = '10rem'

class Statistics extends React.Component {
  state = { showPropsTable: false }

  renderPropsTableBodyRow = ({
    name,
    componentCount,
    componentCoverage,
    components,
    isGlobal,
    isUnique,
  }: IPropStat) => ({
    cells: [
      {
        key: 'name',
        content: (
          <strong>
            {isGlobal && <Label size="small" horizontal color="green" content="Global" />}
            {isUnique && <Label size="small" horizontal color="orange" content="Unique" />}
            {isGlobal || (isUnique && ' ')}
            {name}
          </strong>
        ),
      },
      {
        key: 'components',
        content: (
          <div style={{ display: 'grid', gridTemplateColumns: `${componentNameWidth} 1fr` }}>
            {components.map(({ displayName, description }, i) => {
              const hasPrev = i > 0
              const hasNext = i < components.length - 1
              const hasDescription = !_.isEmpty(_.compact(description))
              const style = {
                margin: 0,
                paddingTop: hasPrev ? '0.2rem' : 0,
                paddingBottom: hasNext ? '0.2rem' : 0,
                ...(hasNext && { borderBottom: '1px dotted #ddd' }),
              }

              return [
                <span
                  key={displayName}
                  style={{ ...style, color: hasDescription ? '#000' : '#db2828' }}
                >
                  {displayName}
                </span>,

                <span
                  key={`${displayName}-description`}
                  style={{ ...style, color: hasDescription ? '#555' : '#db2828' }}
                >
                  {hasDescription ? description : '(missing)'}
                </span>,
              ]
            })}
          </div>
        ),
      },
      { key: 'componentCoverage', content: componentCount },
      { key: 'componentCoverage', content: `${_.round(componentCoverage)}%` },
    ],
  })

  togglePropsTable = () => this.setState({ showPropsTable: !this.state.showPropsTable })

  render() {
    const { showPropsTable } = this.state

    const togglePropsTableButton = (
      <Button
        basic
        fluid
        content={`${showPropsTable ? 'Hide' : 'Show'} Table`}
        icon={showPropsTable ? 'eye slash' : 'eye open'}
        onClick={this.togglePropsTable}
      />
    )

    return (
      <Container>
        <Divider hidden />
        <Header
          as="h1"
          content="Library Statistics"
          subheader="Minimal API surface makes things easier to reason about and talk about. We keep these statistics to help us remove API surface."
        />

        <Divider hidden section />

        <Segment>
          <Header as="h2" textAlign="center" color="grey">
            COMPONENTS
          </Header>
          <Divider hidden />
          <Statistic.Group widths="3">
            <Statistic>
              <Statistic.Value>{parentCount}</Statistic.Value>
              <Statistic.Label>
                Components{' '}
                <Popup
                  trigger={<Icon name="question circle" fitted link />}
                  content={
                    <div>
                      <strong>Components</strong> are top-level, such as <code>Menu</code>.
                    </div>
                  }
                />
              </Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{childCount}</Statistic.Value>
              <Statistic.Label>
                Subcomponents{' '}
                <Popup
                  trigger={<Icon name="question circle" fitted link />}
                  content={
                    <div>
                      <strong>Subcomponents</strong> are component parts, such as a{' '}
                      <code>Menu.Item</code>.
                    </div>
                  }
                />
              </Statistic.Label>
            </Statistic>
            <Statistic label="Total" value={componentCount} />
          </Statistic.Group>
        </Segment>

        <Divider hidden section />

        <Segment>
          <Header as="h2" textAlign="center" color="grey">
            PROPS
          </Header>
          <Divider hidden />
          <Statistic.Group widths="4">
            <Statistic label="Total" value={totalPropCount} />
            <Statistic label="Global" value={globalPropsCount} color="green" />
            <Statistic label="Shared" value={sharedPropsCount} color="teal" />
            <Statistic label="Unique" value={uniquePropsCount} color="orange" />
          </Statistic.Group>
          <Divider hidden />
          {togglePropsTableButton}
          {showPropsTable && <Divider hidden />}
          {showPropsTable && (
            <Table
              definition
              headerRow={['', 'Definitions', 'Components', 'Coverage']}
              tableData={propStats}
              renderBodyRow={this.renderPropsTableBodyRow}
            />
          )}
          {showPropsTable && togglePropsTableButton}
        </Segment>
      </Container>
    )
  }
}

export default Statistics
