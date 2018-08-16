import * as _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
const behaviorMenuItems = require('docs/src/componentMenuBehaviors')
import { Divider, Form, Grid, Menu, Segment, Visibility, SemanticCOLORS } from 'semantic-ui-react'
import ComponentExampleTitle from './ComponentDoc/ComponentExample/ComponentExampleTitle'

class DocsBehaviorRoot extends React.Component<any, any> {
  static propTypes = {
    children: PropTypes.node,
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }),
    }),
  }

  getNameFromFileName(fileName: string) {
    const divided = _.startCase(fileName.replace('ts', ''))
    return _.upperFirst(_.lowerCase(divided))
  }

  render() {
    const exampleStyle: React.CSSProperties = {
      position: 'relative',
      transition: 'box-shadow 200ms, background 200ms',
      background: '#fff',
      boxShadow: '0 1px 2px #ccc',
      // ...(isActive
      //   ? {
      //       boxShadow: '0 8px 32px #aaa',
      //     }
      //   : isHovering && {
      //       boxShadow: '0 2px 8px #bbb',
      //       zIndex: 1,
      //     }),
    }

    const commentBox: React.CSSProperties = {
      padding: 50,
    }
    const { match } = this.props
    const behaviorName = match.params.name.charAt(0).toUpperCase() + match.params.name.slice(1)
    // let jsx
    return (
      <div style={commentBox}>
        {behaviorMenuItems
          .find(behavior => behavior.displayName === behaviorName)
          .variations.map(variation => (
            <Grid className="docs-example" style={exampleStyle}>
              <Grid.Column width={16} style={{ borderBottom: '1px solid #ddd' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ flex: '1' }}>
                    <ComponentExampleTitle
                      description={variation.text}
                      title={this.getNameFromFileName(variation.name)}
                    />
                  </div>
                  <div style={{ flex: '0 0 auto' }} />
                </div>
              </Grid.Column>
            </Grid>
          ))}
      </div>
    )
  }
}

export default DocsBehaviorRoot
