import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Header, Segment } from '@stardust-ui/react'
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
      boxShadow: '0 1px 2px #ccc',
      margin: '1em 1em 1em 2em',
    }

    const { match } = this.props
    const pageTitle = `${_.capitalize(match.params.name)} behaviors`
    return (
      <DocumentTitle title={pageTitle}>
        <Segment>
          <Header
            as="h1"
            aria-level="2"
            content={pageTitle}
            description={`Keyboard and Screenreader options for ${match.params.name} component.`}
          />

          {behaviorMenuItems
            .find(behavior => behavior.displayName === _.capitalize(match.params.name))
            .variations.map((variation, keyValue) => (
              <Segment
                key={keyValue}
                className="docs-example"
                id={_.kebabCase(variation.name)}
                styles={exampleStyle}
              >
                <ComponentExampleTitle
                  title={this.baseName(variation.name)}
                  description={`Name: ${variation.name.replace('.ts', '')}`}
                />

                <div style={{ padding: '1em' }}>
                  {variation.description && (
                    <>
                      <strong>Description:</strong>
                      <br />
                      {variation.description.split('\n').map((splittedText, key) => (
                        <span key={key}>
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
                      {variation.specification.split('\n').map((splittedText, key) => (
                        <span key={key}>
                          {splittedText}
                          <br />
                        </span>
                      ))}
                    </>
                  )}
                </div>
              </Segment>
            ))}
        </Segment>
      </DocumentTitle>
    )
  }
}

export default DocsBehaviorRoot
