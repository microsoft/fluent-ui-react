import * as _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
const behaviorMenuItems = require('docs/src/behaviorMenu')
import { Grid } from 'semantic-ui-react'
import ComponentExampleTitle from './ComponentDoc/ComponentExample/ComponentExampleTitle'
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
    const divided = _.startCase(fileName.replace('ts', ''))
    return _.upperFirst(_.lowerCase(divided))
  }

  render() {
    const exampleStyle: React.CSSProperties = {
      position: 'relative',
      transition: 'box-shadow 200ms, background 200ms',
      background: '#fff',
      boxShadow: '0 1px 2px #ccc',
      margin: '10px',
    }

    const commentBox: React.CSSProperties = {
      padding: 5,
    }
    const { match } = this.props
    return (
      <div style={commentBox}>
        {behaviorMenuItems
          .find(behavior => behavior.displayName === _.capitalize(match.params.name))
          .variations.map((variation, keyValue) => (
            <Grid key={keyValue} className="docs-example" style={exampleStyle}>
              <Grid.Column width={16} style={{ borderBottom: '1px solid #ddd' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ flex: '1' }}>
                    <ComponentExampleTitle
                      id={_.kebabCase(variation.name)}
                      title={this.baseName(variation.name)}
                      description={`Behavior name: ${variation.name.replace('.ts', '')}`}
                    />
                  </div>
                  <div style={{ flex: '0 0 auto' }} />
                </div>
              </Grid.Column>
              <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                <span> Description: </span>
                <br />
                {variation.text.split('\n').map((splittedText, keyValue) => {
                  return (
                    <span key={keyValue}>
                      {splittedText}
                      <br />
                    </span>
                  )
                })}
              </div>
            </Grid>
          ))}
      </div>
    )
  }
}

export default DocsBehaviorRoot
