import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import DocumentTitle from 'react-document-title'
import ComponentExampleTitle from './ComponentDoc/ComponentExample/ComponentExampleTitle'

const behaviorMenuItems = require('docs/src/behaviorMenu')

class DocsBehaviorRoot extends React.Component<any, any> {
  static propTypes = {
    children: PropTypes.node,
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
  }

  baseName(fileName: string) {
    const divided = _.startCase(fileName.replace(/\.ts$/, ''))
    return _.upperFirst(_.lowerCase(divided))
  }

  render() {
    const exampleStyle: React.CSSProperties = {
      position: 'relative',
      transition: 'box-shadow 200ms, background 200ms',
      background: '#fff',
      boxShadow: '0 1px 2px #ccc',
      margin: '1em 1em 1em 2em',
    }

    const { match } = this.props
    const pageTitle = `${_.capitalize(match.params.name)} behaviors`
    return (
      <DocumentTitle title={pageTitle}>
        <Grid>
          <Grid.Row style={{ margin: '1em' }}>
            <Grid.Column>
              <Header
                as="h1"
                content={pageTitle}
                subheader={`Keyboard and Screenreader options for ${match.params.name}s.`}
              />
            </Grid.Column>
          </Grid.Row>
          {behaviorMenuItems
            .find(behavior => behavior.displayName === _.capitalize(match.params.name))
            .variations.map((variation, keyValue) => (
              <Grid.Row
                key={keyValue}
                className="docs-example"
                id={_.kebabCase(variation.name)}
                style={exampleStyle}
              >
                <Grid.Column
                  width={16}
                  style={{ borderBottom: '1px solid #ddd', padding: '0 0 0 1em' }}
                >
                  <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1', marginBottom: '1em' }}>
                      <ComponentExampleTitle
                        title={this.baseName(variation.name)}
                        description={`Name: ${variation.name.replace('.ts', '')}`}
                      />
                    </div>
                    <div style={{ flex: '0 0 auto' }} />
                  </div>
                </Grid.Column>
                <div style={{ padding: '1em' }}>
                  {variation.description && (
                    <>
                      <strong>Description:</strong>
                      <br />
                      {variation.description.split('\n').map((splittedText, keyValue) => (
                        <span key={keyValue}>
                          {splittedText}
                          <br />
                        </span>
                      ))}
                    </>
                  )}
                  {variation.specification && (
                    <>
                      {variation.description && <br />}
                      <strong>Specification:</strong>
                      <br />
                      {variation.specification.split('\n').map((splittedText, keyValue) => (
                        <span key={keyValue}>
                          {splittedText}
                          <br />
                        </span>
                      ))}
                    </>
                  )}
                </div>
              </Grid.Row>
            ))}
        </Grid>
      </DocumentTitle>
    )
  }
}

export default DocsBehaviorRoot
